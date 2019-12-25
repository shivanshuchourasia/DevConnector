const express = require('express')
require('./db/db')

const app = express()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
