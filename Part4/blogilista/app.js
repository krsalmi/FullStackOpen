const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => {
  logger.info("THIS IS URL: ", config.MONGODB_URI)
})
// .catch((error) => {
//   logger.error("failed to connect to MongoDB", error.message)
// })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app