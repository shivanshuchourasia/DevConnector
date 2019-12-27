const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

router.get('/api/profile/me', auth, async (req, res) => {
  try {
    const profile = await await Profile.findOne({ user: req.user.id })

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    profile.populate('user', ['name', 'avatar'])
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
