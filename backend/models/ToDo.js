const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  complete: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

const ToDo = mongoose.model('todos', ToDoSchema)

module.exports = ToDo