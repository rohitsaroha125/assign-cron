const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task Title is a required field']
  },
  status: {
    type: String,
    enum: ['completed', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
