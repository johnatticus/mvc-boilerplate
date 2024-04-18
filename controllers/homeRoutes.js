const router = require('express').Router()
const { User } = require('../models')

const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/home')
    return
  }
  res.render('login', {
    layout: 'landing'
  })
})

// route to display all users in database at api/results
router.get('/results', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ all: true, nested: true }]
    })
    const users = userData.get({ plain: true })
    const userListData = await User.findAll()
    const userList = userListData.map((user) => user.get({ plain: true }))
    // Pass serialized data and session flag into template
    res.render('userResults', {
      layout: 'main',
      users,
      userList,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// route to get a user in the database by their ID
router.get('/results/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.params.id, {
      include: [{ all: true, nested: true }],
      attributes: { exclude: ['password'] }
    })
    const users = userData.get({ plain: true })
    res.render('profile', {
      users,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

// route to send visitor to login page.
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return
  }

  res.render('login', {
    layout: 'landing'
  })
})

router.get('/about', async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    include: [{ all: true, nested: true }]
    // attributes: { exclude: ['password'] }
  })
  const users = userData.get({ plain: true })

  res.render('about', {
    users,
    logged_in: req.session.logged_in
  })
})

// rout to get the logged in user's profile
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ all: true, nested: true }]
      // attributes: { exclude: ['password'] }
    })
    const users = userData.get({ plain: true })
    res.render('userprofile', {
      users,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.render('login', {
      layout: 'landing'
    })
  }
})

router.get('/home', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      include: [{ all: true, nested: true }]
      // attributes: { exclude: ['password'] }
    })
    const users = userData.get({ plain: true })
    res.render('homeLoggedIn', {
      users,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.render('login', {
      layout: 'landing'
    })
  }
})

module.exports = router
