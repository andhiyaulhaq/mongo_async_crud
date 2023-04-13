const express = require('express')
const router = express.Router()
const { refreshTokenHandler } = require('../controllers/refreshTokenController')

router.get('/', refreshTokenHandler)

module.exports = router
