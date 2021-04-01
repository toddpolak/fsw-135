import React from 'react'

export default function Issue(props) {
  const { title, description, votes, handleUpvote, handleDownvote } = props
  
  return (
    <div className="issue">
      <h1>{ title } </h1>
      <h2>Votes:{ votes }</h2>
      <h3>{ description }</h3>
      <div className='vote-btns'>
        <button
            onClick={() => handleUpvote(props._id)}>
            Up-Vote
        </button>
        <button
            onClick={() => handleDownvote(props._id)}>
            Down-Vote
        </button>
      </div>
    </div>
  )
}
