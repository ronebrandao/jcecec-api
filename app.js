require('dotenv').config()
const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express()

app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = require('./routes/users')
const institutions = require('./routes/institutions')

app.use('/users', users)
app.use('/institutions', institutions)

const PORT = process.env.PORT || 9000
app.listen(PORT, () => console.log("JCECEC - API. Porta 9000"))