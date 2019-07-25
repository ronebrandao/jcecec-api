require('dotenv').config()
const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')

const app = express()

app.use(cors({origin: true}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const users = require('./routes/users')

app.use('/users', users)

app.listen(9000, () => console.log("JCECEC - API. Porta 9000"))