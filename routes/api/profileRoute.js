const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route      GET api/profile/me
// @desc       Get my profile
// @access     Private
router.get('/api/profile/me', auth, async (req, res) => {
  try {
    const profile = await await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    profile.populate('user', ['name', 'avatar'])
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route      POST api/profile/me
// @desc       Create and Update my profile
// @access     Private
router.post(
  '/api/profile',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      linkedin,
      twitter,
      instagram
    } = req.body

    const profileFields = { status }
    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (githubusername) profileFields.githubusername = githubusername
    if (youtube) profileFields.youtube = youtube

    profileFields.social = {}
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (twitter) profileFields.social.twitter = twitter
    if (instagram) profileFields.social.instagram = instagram

    profileFields.skills = skills.split(',').map(skills => skills.trim())

    try {
      let profile = await Profile.findOne({ user: req.user.id })

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }

      // Create
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route      GET api/profile
// @desc       Get all profiles
// @access     Public
router.get('/api/profile', async (req, res) => {
  try {
    const profiles = await Profile.find({}).populate('user', ['name', 'avatar'])

    if (!profiles) {
      return res.status(400).json({ msg: 'There are no profiles' })
    }

    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route      GET api/profile/user/:user_id
// @desc       Get user's profile
// @access     Public
router.get('/api/profile/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' })
    res.status(500).send('Server Error')
  }
})

module.exports = router
