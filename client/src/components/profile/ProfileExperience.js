import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({ experience }) => {
  return (
    <div>
      <h3 className='text-dark'>{experience.company}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{experience.from}</Moment> -{' '}
        {!experience.to ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YY'>{experience.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {experience.title}
      </p>
      {experience.description && (
        <Fragment>
          <p>
            <strong>Description: </strong>Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dignissimos placeat, dolorum ullam ipsam, sapiente
            suscipit dicta eius velit amet aspernatur asperiores modi quidem
            expedita fugit.
          </p>
        </Fragment>
      )}
    </div>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired
}

export default ProfileExperience
