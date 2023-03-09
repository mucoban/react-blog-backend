const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { connection } = mongoose
const {checkUserAuthentication} = require("./controllers/auth.controller");

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri)
connection.once('open', () => { console.log('Mongodb established') })

const authRouter = require('./routes/auth')
app.use(authRouter)

app.get('/', checkUserAuthentication, (req, res) => { res.json('test') })

app.listen(port, () => { console.log('connection established on port ' + port) })