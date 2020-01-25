import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({ education }) => {
  return (
    <div>
      <h3>{education.school}</h3>
      <p>
        <Moment format='DD/MM/YYYY'>{education.from}</Moment> -{' '}
        {!education.to ? (
          'Now'
        ) : (
          <Moment format='DD/MM/YY'>{education.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {education.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {education.fieldofstudy}
      </p>
      {education.description && (
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

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEducation
