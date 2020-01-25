import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile }) => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={profile.user.avatar} alt='' />
        <div>
          <h2>{profile.user.name}</h2>
          <p>
            {profile.status}{' '}
            {profile.company && <span> at {profile.company}</span>}
          </p>
          <p className='my-1'>
            {profile.location && <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.user._id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </div>

        <ul>
          {profile.skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary'>
              <i className='fas fa-check'></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
