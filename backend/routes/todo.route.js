const express = require('express')
const router = express.Router()
const ToDo = require('../models/ToDo')

router.post('/addtodo',  async (req, res) => {
  try {
    const {message} = req.body
    const todo = {
      userID: "ssd",
      message: message,
      complete: false,
      date: new Date()
    }
    const newTodo = new ToDo(todo)
    await newTodo.save()
    res.status(200).send({status: 'ToDo added', todo: newTodo})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.get('/gettodos',  async (req, res) => {
  try {
    const todos = await ToDo.find({userID: "ssd"})
    res.status(200).send({status: 'Fetched todos', todo: todos})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.get('/getcompletetodos',  async (req, res) => {
  try {
    const todos = await ToDo.find({userID: req.user._id, complete: true})
    res.status(200).send({status: 'Fetched completed todos', todo: todos})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.put('/markcomplete',  async(req, res) => {
  try {
    const { itemID, complete } = req.body
    const todoItem = await ToDo.findByIdAndUpdate(itemID, {complete: complete})
    res.status(200).send({status: 'complete todo', item: todoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.put('/updatetodo/:id', async(req, res) => {
  const todoID = req.params.id
  try {
    const {message} = req.body
    const todoItem = await ToDo.findOneAndUpdate({_id: todoID, message: message})
    res.status(200).send({status: 'Todo Updated', updatedTodo: todoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.delete('/deletetodo/:id',  async(req, res) => {
  const todoID = req.params.id
  try {
      const deleteTodoItem = await ToDo.findByIdAndDelete(todoID)
      res.status(200).send({status: 'Todo Deleted', deletedTodo: deleteTodoItem})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

router.delete('/deleteall',  async (req, res) => {
  try {
    await ToDo.deleteMany({userID: req.user.id})
    res.status(200).send({status: 'All ToDos deleted'})
  } catch (error) {
    res.status(500).send(error.message)
    console.log(error.message)
  }
})

module.exports = router