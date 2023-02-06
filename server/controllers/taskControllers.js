const Task = require('../models/task')
const AppError = require('../utils/AppError')
const taskControllers = {}

taskControllers.getTasks = async (req, res, next) => {
  try {
    const queryObj = {}
    if (req.query) {
      const { status, title } = req.query
      if (status) {
        queryObj.status = status
      }
      if (title) {
        queryObj.title = { $regex: title, $options: 'i' }
      }
    }
    const tasksList = await Task.find(queryObj).sort({ createdAt: -1 }).limit(20)
    res.status(200).json({
      status: true,
      data: tasksList
    })
  } catch (err) {
    next(new AppError(404, err.message, err))
  }
}

taskControllers.postTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({ title: req.body.title })
    res.status(200).json({
      status: true,
      data: newTask
    })
  } catch (err) {
    next(new AppError(400, err.message, err))
  }
}

taskControllers.updateTask = async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  try {
    const taskData = await Task.findByIdAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true
    })
    res.status(200).json({
      status: true,
      data: taskData
    })
  } catch (err) {
    next(new AppError(400, 'Invalid Inputs', err))
  }
}

taskControllers.deleteTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const taskData = await Task.findByIdAndDelete({ _id: id })
    res.status(200).json({
      status: true,
      data: taskData
    })
  } catch (err) {
    next(new AppError(404, 'Record not found', err))
  }
}

module.exports = taskControllers
