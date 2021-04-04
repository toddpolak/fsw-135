import React, { useState } from 'react'

function AddComment(props) {

    const initInput = {
        comment: ''
    }

    const [input, setInput] = useState(initInput)
    const { _id, addComment } = props

    function handleChange(e) {
        const { name, value } = e.target

        setInput(prevInput => ({ ...prevInput, [name]: value }))
    }

    function handleSave() {
        addComment(_id, input)
        setInput(initInput)
    }

    return (
        <div className='add-comment-form'>
            <div>
                <textarea
                    type='text'
                    name='comment'
                    value={input.comment}
                    onChange={handleChange}
                    placeholder='Comments' />
            </div>
            <div>
                <button onClick={handleSave}>
                    Add Comment
                </button>
            </div>
        </div>
    )
}

export default AddComment
