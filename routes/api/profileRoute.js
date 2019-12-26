const express = require('express')
const router = new express.Router()

router.get('/api/profile', (req, res) => {
  res.send('Profile Route')
})

module.exports = router
