const {signup,login} = require('../Controllers/UserController')
const router = require('express').Router()

router.post('/signup',signup)
router.post('/login',login)

module.exports = router