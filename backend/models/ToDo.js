const mongoose = require('mongoose')

const ToDoSchema = new mongoose.Schema({
  userID: {
    type: String,
    
  },
  message: {
    type: String,
   
  },
  complete: {
    type: Boolean,
    
  },
  date: {
    type: Date,
   
  }
})

const ToDo = mongoose.model('todos', ToDoSchema)

module.exports = ToDo