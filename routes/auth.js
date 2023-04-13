const express = require('express')
const router = express.Router()
const { authHandler } = require('../controllers/authController')

router.post('/', authHandler)

module.exports = router
