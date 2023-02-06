const mongoose = require('mongoose')

module.exports = mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log('Connected to mongodb')
}).catch(() => {
  console.log('DB not connected')
})
