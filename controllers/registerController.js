const User = require('../model/User')
const bcrypt = require('bcrypt')

const registerHandler = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd) {
    return res.status(400).json({
      message: 'Username and password are required'
    })
  }

  // check for duplicate username in the db
  const duplicate = await User.findOne({ username: user }).exec()
  if (duplicate) return res.sendStatus(409) // Conflict

  try {
    // encrypt the password
    const hashedPassword = await bcrypt.hash(pwd, 10)
    // create and store the new user
    const newUser = await User.create({
      username: user,
      password: hashedPassword
    })

    console.log(newUser)

    res.status(201).json({
      success: `New user ${user} created`
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { registerHandler }
