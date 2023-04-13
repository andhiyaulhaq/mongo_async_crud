const express = require('express')
const router = express.Router()
const path = require('path')

// bisa diakses dengan / saja, /index.html, atau /index.html
router.get('^/$|index(.html)?', (req, res) => {
  // res.sendFile('./views/index.html', { root: __dirname})
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

router.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'))
})

router.get('/old-page(.html)?', (req, res) => {
  // defaultnya 302, biar bisa 301 makanya disisipkan di depan
  res.redirect(301, '/new-page.html')
})

module.exports = router
