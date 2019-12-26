const express = require('express')
const router = new express.Router()

router.get('/api/posts', (req, res) => {
  res.send('Posts Route')
})

module.exports = router
