const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Post = require('../../models/Post')
const User = require('../../models/User')

router.get('/api/posts', (req, res) => {
  res.send('Posts Route')
})

// @route      POST api/posts
// @desc       Create a post
// @access     Private
router.post(
  '/api/posts',
  [
    auth,
    check('text', 'Text is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() })

    try {
      const user = await User.findById(req.user.id).select('-password')

      const post = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar
      })

      await post.save()
      res.json(post)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
