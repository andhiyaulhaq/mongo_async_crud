const express = require('express')
const router = express.Router()
const { registerHandler } = require('../controllers/registerController')

router.post('/', registerHandler)

module.exports = router
