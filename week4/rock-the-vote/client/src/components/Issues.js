import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from '../components/IssueForm'
import IssueList from '../components/IssueList'

export default function Issues() {
  const { user, addIssue, issues } = useContext(UserContext)

  return (
    <div className="issues">
      <h1>Issues</h1>
      <IssueForm addIssue={addIssue} />
      <h3>Your Issues</h3>
      <IssueList issues={issues} />
    </div>
  )
}
