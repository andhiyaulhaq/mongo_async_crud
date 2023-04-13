require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const rootRoute = require('./routes/root')
const registerRoute = require('./routes/register')
const authRoute = require('./routes/auth')
const refreshRoute = require('./routes/refresh')
const subdirRoute = require('./routes/subdir')
const employeesRoute = require('./routes/api/employees')
const logoutRoute = require('./routes/logout')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middleware/verifyJWT')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500

// Connect to MongoDB
connectDB()

// custom middleware logger
app.use(logger)

// Cross-Origin Resource Sharing
app.use(cors(corsOptions))

// built-in middleware to handle urlencoded form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }))

// built-in middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())

// serve static file (tulisan direktori yang menjadi referensi css di index.html, new-page.html ataupun yg lain bisa diganti yang awalnya ../css/... jadi css/... langsung)
app.use(express.static(path.join(__dirname, '/public')))
app.use('/subdir', express.static(path.join(__dirname, '/public')))

// Routes
app.use('/', rootRoute)
app.use('/subdir', subdirRoute)
app.use('/register', registerRoute)
app.use('/auth', authRoute)
app.use('/refresh', refreshRoute)
app.use('/logout', logoutRoute)

app.use(verifyJWT) // semua route di bawah ini akan menggunakan verifiyJWT, route di atas tidak
app.use('/employees', employeesRoute)

// Route handlers

app.all('*', (req, res) => {
  // nggak pakai sendStatus biar halaman html yg muncul bisa custom
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' })
  } else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
