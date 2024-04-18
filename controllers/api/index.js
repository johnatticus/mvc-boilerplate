const router = require('express').Router()

// Main Routes
const userRoutes = require('./userRoutes')
const profileRoutes = require('./profileRoutes')

router.use('/users', userRoutes)
router.use('/profile', profileRoutes)

module.exports = router
