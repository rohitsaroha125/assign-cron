const express = require('express')
const taskControllers = require('../controllers/taskControllers')

const router = express.Router()

router.get('/', taskControllers.getTasks)
router.post('/', taskControllers.postTask)
router.patch('/:id', taskControllers.updateTask)
router.delete('/:id', taskControllers.deleteTask)

module.exports = router
