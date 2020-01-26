import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { deleteComment } from '../../actions/post'

const CommentItem = ({ comment, postId, deleteComment, auth }) => {
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${comment.user}`}>
          <img className='round-img' src={comment.avatar} alt='' />
          <h4>{comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{comment.text}</p>
        <p className='post-date'>
          Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
        </p>
        {!auth.loading && auth.user._id === comment.user && (
          <button
            onClick={e => deleteComment(postId, comment._id)}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem)
