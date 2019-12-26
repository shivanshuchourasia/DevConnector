const express = require('express')
require('./db/db')

const app = express()

// Init middleware
app.use(express.json({ extended: false }))

// Load Routes
app.use(require('./routes/api/userRoute'))
app.use(require('./routes/api/authRoute'))
app.use(require('./routes/api/profileRoute'))
app.use(require('./routes/api/postRoute'))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
