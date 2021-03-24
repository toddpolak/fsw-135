import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueList from '../components/IssueList'

export default function Profile() {
  const { user, issues } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome {`${user.firstname} ${user.lastname}`}</h1>
      <h3>Your Issues:</h3>
      <IssueList issues={issues} />
    </div>
  )
}
