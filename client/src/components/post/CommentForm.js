import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addComment } from '../../actions/post'

const CommentForm = ({ addComment, post: { post } }) => {
  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    addComment(post._id, { text })
    setText('')
  }

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave A Comment</h3>
      </div>
      <form className='form my-1' onSubmit={e => onSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Comment on this post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { addComment })(CommentForm)
