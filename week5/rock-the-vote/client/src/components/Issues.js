import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import IssueForm from '../components/IssueForm'
import IssueList from '../components/IssueList'

export default function Issues() {
  const { user, addIssue, issues, allIssues } = useContext(UserContext)

  return (
    <div className="issues">
      <h1>Issues</h1>
      <IssueForm addIssue={addIssue} />
      <h3>All Issues</h3>
      <IssueList issues={allIssues} />
    </div>
  )
}
