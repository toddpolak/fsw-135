import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function Profile() {
  const { user } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome {`${user.firstname} ${user.lastname}`}</h1>
    </div>
  )
}
