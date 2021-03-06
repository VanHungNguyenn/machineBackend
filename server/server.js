require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes
app.use('/user', require('./routes/usersRouter'))
app.use('/hardware', require('./routes/machinesRouter'))
app.use('/history_api', require('./routes/historyMachinesRouter'))
app.use(function (req, res) {
	res.status(404).send('404 Not Found')
})

// Connect to mongoose
const URI = process.env.MONGODB_URL
mongoose.connect(URI, (err) => {
	if (err) throw err
	console.log('Connected to mongodb')
})

const PORT = process.env.PORT || 5003

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
