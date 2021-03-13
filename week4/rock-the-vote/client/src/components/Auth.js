import React, { useState, useContext } from 'react'
import AuthForm from './NewAcct'
import Login from './Login'
import { UserContext } from '../context/UserProvider'

const initLoginInputs = { username: '', password: '' }
const initNewAcctInputs = { firstname: '', lastname: '', username: '', password: ''}

export default function Auth() {
  const [loginInputs, setLoginInputs] = useState(initLoginInputs)
  const [newAcctInputs, setNewAcctInputs] = useState(initNewAcctInputs)
  const [toggle, setToggle] = useState(false)
  const { signup, login } = useContext(UserContext)

  function handleChangeLogin(e){
    const {name, value} = e.target
    setLoginInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleChangeNewAcct(e){
    const {name, value} = e.target
    setNewAcctInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  function handleSignup(e){
    e.preventDefault()
    signup(newAcctInputs)
  }

  function handleLogin(e){
    e.preventDefault()
    login(loginInputs)
  }

  return (
    <div className="auth-container">
      { !toggle ?
        <>
          <AuthForm 
            handleChange={handleChangeNewAcct}
            handleSubmit={handleSignup}
            inputs={newAcctInputs}
            btnText="Sign up"
          />
          <p className='link' onClick={() => setToggle(prev => !prev)}>Already a member?</p>
        </>
      :
        <>
          <Login 
            handleChange={handleChangeLogin}
            handleSubmit={handleLogin}
            inputs={loginInputs}
            btnText="Login"
          />
          <p className='link' onClick={() => setToggle(prev => !prev)}>Not a member?</p>
        </>
      }
    </div>
  )
}
