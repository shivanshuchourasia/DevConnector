import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const { title, company, location, from, to, current, description } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    addExperience(formData, history)
  }

  return (
    <Fragment>
      <h1 class='large text-primary'>Add An Experience</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={e => onSubmit(e)}>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            onChange={e => onChange(e)}
            value={title}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            onChange={e => onChange(e)}
            value={company}
            required
          />
        </div>
        <div class='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={e => onChange(e)}
            value={location}
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
            placeholder='Job Description'
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience))
