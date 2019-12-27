const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')

router.get('/api/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
