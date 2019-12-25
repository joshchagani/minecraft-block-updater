require('dotenv').config()
require('./models/Block')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const routes = require('./routes/index')
const cors = require('cors')

// Connect to Database
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
mongoose.connection.on('error', err => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

// Setup CORS
const whitelist = ['http://localhost:3000']
const corsOptions = {
	origin: function(origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
}
app.use(cors(corsOptions))

// Routes
app.use('/', routes)

// Start listening
app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`)
})
