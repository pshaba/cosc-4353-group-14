// npm run dev

const express = require('express')
const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());

const eventRoutes = require('./routes/events');
const volunteerHistoryRoutes = require('./routes/volunteerHistory');

app.use('/api/events', eventRoutes);
app.use('/api/volunteer-history', volunteerHistoryRoutes);

app.get("/", (req, res) => {
    res.send("Server is ready");
})

app.listen(5000, () => {console.log("Server started on port 5000")} )// backend is gonna run on port 5000

module.exports = app;
// app.get("/api", (req, res) => {
//     res.json({"users": ["USerOne", "userTwo", "userThree"]}) //temp users array that will be fetched and displayed on the front end
// })