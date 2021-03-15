import React, { useState } from 'react'
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '', 
        issues: JSON.parse(localStorage.getItem('issues')) || [],
        allIssues: JSON.parse(localStorage.getItem('allIssues')) || []
    }
    const [userState, setUserState] = useState(initState)

    function signup(credentials) {
        axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data

                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))

                getUserIssues()
                getAllIssues()
                setUserState(prevState => ({
                    ...prevState,
                    user,
                    token
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('issues')
        setUserState({
            user: {},
            token: '',
            issues: []
        })
    }

    function getUserIssues() {
        userAxios.get("/api/issues/user")
        .then(res => {
            localStorage.setItem('issues', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllIssues() {
        userAxios.get("/api/issues")
        .then(res => {
            localStorage.setItem('allIssues', JSON.stringify(res.data))

            setUserState(prevState => ({
                ...prevState,
                allIssues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(newIssue) {
        userAxios.post('/api/issues', newIssue)
            .then(res => {
                setUserState(prevState => ({
                    ...prevState, 
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    return (
        <UserContext.Provider
            value={{
                ...userState, 
                signup,
                login,
                logout,
                addIssue
            }}>
            { props.children }
        </UserContext.Provider>
    )
}
