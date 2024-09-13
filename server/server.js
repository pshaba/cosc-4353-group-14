// npm run dev

const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(5000, () => {console.log("Server started on port 5000")} )// backend is gonna run on port 5000

// app.get("/api", (req, res) => {
//     res.json({"users": ["USerOne", "userTwo", "userThree"]}) //temp users array that will be fetched and displayed on the front end
// })