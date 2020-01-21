import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 class='large text-primary'>Add Your Education</h1>
      <p class='lead'>
        <i class='fas fa-graduation-cap'></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={e => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            onChange={e => onChange(e)}
            value={school}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            onChange={e => onChange(e)}
            value={degree}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Field Of Study'
            name='fieldofstudy'
            onChange={e => onChange(e)}
            value={fieldofstudy}
          />
        </div>
        <div class='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            onChange={e => onChange(e)}
            value={from}
          />
        </div>
        <div class='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              onChange={e => {
                setFormData({ ...formData, current: !current })
                toggleDisabled(!toDateDisabled)
              }}
              value={current}
              checked={current}
            />{' '}
            Current School or Bootcamp
          </p>
        </div>
        <div class='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            onChange={e => onChange(e)}
            value={to}
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            onChange={e => onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation))
