const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const Post = require('../../models/Post')
const User = require('../../models/User')
const mongoose = require('mongoose')

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

// @route      GET api/posts
// @desc       Get all posts
// @access     Private
router.get('/api/posts', auth, async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ date: -1 })

    if (!posts) return res.status(404).json({ msg: 'There are no posts' })

    res.json(posts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route      GET api/posts/:id
// @desc       Get post by Id
// @access     Private
router.get('/api/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    res.json(post)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

// @route      DELETE api/posts/:id
// @desc       Delete a post by Id
// @access     Private
router.delete('/api/posts/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    if (req.user.id != post.user)
      return res
        .status(401)
        .json({ msg: 'User not authorized to delete the post' })

    await Post.findOneAndRemove({ _id: req.params.id })
    res.send('Post deleted')
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

// @route      PUT api/posts/like/:id
// @desc       Like a post
// @access     Private
router.put('/api/posts/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    const user = post.likes.filter(like => like.user.toString() === req.user.id)

    if (user[0]) {
      return res.status(400).json({ msg: 'Post already liked' })
    }

    post.likes.unshift({ user: mongoose.Types.ObjectId(req.user.id) })
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

// @route      PUT api/posts/unlike/:id
// @desc       Unlike a post
// @access     Private
router.put('/api/posts/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) return res.status(404).json({ msg: 'Post not found' })

    const user = post.likes.filter(like => like.user.toString() === req.user.id)

    if (user.length === 0) {
      return res.status(400).json({ msg: 'Post is not liked' })
    }

    const users = post.likes.filter(
      like => like.user.toString() !== req.user.id
    )
    post.likes = users
    await post.save()
    res.json(post.likes)
  } catch (err) {
    console.error(err.message)
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'Post not found' })
    res.status(500).send('Server Error')
  }
})

module.exports = router
