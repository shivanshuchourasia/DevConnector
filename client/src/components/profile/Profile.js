import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const Profile = ({
  match,
  profile: { profile, loading },
  auth,
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return profile === null || loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/profiles' className='btn btn-light'>
        Back To Profiles
      </Link>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === profile.user._id && (
          <Link to='/edit-profile' className='btn btn-dark'>
            Edit Profile
          </Link>
        )}

      <div className='profile-grid my-1'>
        {/* Top */}
        <div className='profile-top bg-primary p-2'>
          <img className='round-img my-1' src={profile.user.avatar} alt='' />
          <h1 className='large'>{profile.user.name}</h1>
          <p className='lead'>
            {profile.status}{' '}
            {profile.company && <span> at {profile.company}</span>}
          </p>
          <p>{profile.location && <span>{profile.location}</span>}</p>
          {profile.social && (
            <div className='icons my-1'>
              <Link to='#' target='_blank' rel='noopener noreferrer'>
                <i className='fas fa-globe fa-2x'></i>
              </Link>
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-twitter fa-2x'></i>
                </a>
              )}
              {profile.social.facebook && (
                <a
                  href={profile.social.facebook}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-facebook fa-2x'></i>
                </a>
              )}

              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-linkedin fa-2x'></i>
                </a>
              )}

              {profile.social.youtube && (
                <a
                  href={profile.social.youtube}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-youtube fa-2x'></i>
                </a>
              )}

              {profile.social.instagram && (
                <a
                  href={profile.social.instagram}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <i className='fab fa-instagram fa-2x'></i>
                </a>
              )}
            </div>
          )}
        </div>

        {/* About */}
        <div className='profile-about bg-light p-2'>
          <h2 className='text-primary'>John's Bio</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
            neque modi perspiciatis similique?
          </p>
          <div className='line'></div>
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            <div className='p-1'>
              <i className='fa fa-check'></i> HTML
            </div>
            <div className='p-1'>
              <i className='fa fa-check'></i> CSS
            </div>
            <div className='p-1'>
              <i className='fa fa-check'></i> JavaScript
            </div>
            <div className='p-1'>
              <i className='fa fa-check'></i> Python
            </div>
            <div className='p-1'>
              <i className='fa fa-check'></i> C#
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experience</h2>
          <div>
            <h3 className='text-dark'>Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Position: </strong>Senior Developer
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Sun Microsystems</h3>
            <p>Nov 2004 - Nov 2011</p>
            <p>
              <strong>Position: </strong>Systems Admin
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>

        {/* Education */}
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          <div>
            <h3>University Of Washington</h3>
            <p>Sep 1993 - June 1999</p>
            <p>
              <strong>Degree: </strong>Masters
            </p>
            <p>
              <strong>Field Of Study: </strong>Computer Science
            </p>
            <p>
              <strong>Description: </strong>Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos placeat, dolorum ullam
              ipsam, sapiente suscipit dicta eius velit amet aspernatur
              asperiores modi quidem expedita fugit.
            </p>
          </div>
        </div>

        {/* Github */}
        <div class='profile-github'>
          <h2 class='text-primary my-1'>
            <i class='fab fa-github'></i> Github Repos
          </h2>
          <div class='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <Link to='#' target='_blank' rel='noopener noreferrer'>
                  Repo One
                </Link>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class='badge badge-primary'>Stars: 44</li>
                <li class='badge badge-dark'>Watchers: 21</li>
                <li class='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
          <div class='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <Link to='#' target='_blank' rel='noopener noreferrer'>
                  Repo Two
                </Link>
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, laborum!
              </p>
            </div>
            <div>
              <ul>
                <li class='badge badge-primary'>Stars: 44</li>
                <li class='badge badge-dark'>Watchers: 21</li>
                <li class='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
