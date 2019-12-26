const express = require('express')
const router = new express.Router()

router.get('/api/auth', (req, res) => {
  res.send('Auth Route')
})

module.exports = router
