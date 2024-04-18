const router = require('express').Router()
const { User } = require('../../models')
const { Friend } = require('../../models')

const withAuth = require('../../utils/auth')

// add friend
router.post('/add', withAuth, async (req, res) => {
  try {
    const newFriend = await Friend.create({
      ...req.body,
      user_id: req.session.user_id
    })
    res.status(200).json(newFriend)
  } catch (err) {
    res.status(400).json(err)
  }
})

// remove friend
router.delete('/remove/:id', withAuth, async (req, res) => {
  try {
    const friendData = await Friend.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!friendData) {
      res.status(404).json({ message: 'No friend found with this id!' })
      return
    }
    res.status(200).json(friendData)
  } catch (err) {
    res.status(500).json(err)
  }
})

// edit profile
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        city: req.body.city,
        state: req.body.state,
        fitness_level: req.body.fitness_level,
        availability: req.body.availability,
        gender: req.body.gender
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(userData)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
