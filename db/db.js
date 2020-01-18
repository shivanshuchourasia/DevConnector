const mongoose = require('mongoose')
require('dotenv').config()

mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Connected...')
  })

//mongodb://127.0.0.1:27017/DevConnector
