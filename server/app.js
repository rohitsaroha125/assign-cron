const express = require('express')
const cors = require('cors')
const taskRoutes = require('./routes/taskRoutes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.use(cors())

// parse body from request
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// routes
app.use('/tasks', taskRoutes)

const port = process.env.PORT || 5000

// eslint-disable-next-line no-unused-vars
const connection = require('./config/connection')

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
