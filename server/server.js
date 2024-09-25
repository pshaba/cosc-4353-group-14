// npm run dev

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routes/router')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router)

app.listen(5000, () => {
    console.log("Server started on port 5000")
} )// backend is gonna run on port 5000

