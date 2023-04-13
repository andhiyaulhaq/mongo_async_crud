const express = require('express')
const router = express.Router()
const { logoutHandler } = require('../controllers/logoutController')

router.get('/', logoutHandler)

module.exports = router
