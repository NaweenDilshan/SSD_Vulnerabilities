const express = require('express')
const router = express.Router() 
const User = require('../models/User')

router.post('/create', async (req, res) => {
  try {
    const {name, email, password} = req.body

    let user = await User.findOne({email})
    user = {
      username: name,
      email: email,
      password: password
    }
    const newUser = new User(user)
    await newUser.save()
    res.status(200).send({status: 'User Created', user: newUser})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.get('/getuser',  async (req, res) => {
  try {
    res.status(200).send({status: 'User fetched', user: req.user})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.put('/updateuser',  async (req, res) => {
  try {
    const {name, email, password} = req.body
    const user = {
      username: name,
      email: email,
      password: password,
    };

    const updateUser = await User.findByIdAndUpdate(req.user._id, user)
    res.status(200).send({status: 'User Updated', update_user: updateUser})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.delete('/deleteuser/:id', async (req, res) => {
  const userID = req.params.id
  try {
    const deleteUser = await User.findByIdAndDelete(userID)
    res.status(200).send({status: 'User Deleted', deleted_user: deleteUser})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findByCredentials(email, password)
    res.status(200).send({status: 'Login success', user: user})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.post('/logout',  async (req, res) => {
  try {
    res.status(200).send('Logout successfully')
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

module.exports = router