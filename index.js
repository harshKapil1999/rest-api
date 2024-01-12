const express = require('express')
require('dotenv').config()
const fs = require('fs')
const mongoose = require('mongoose')

const userRouter = require("./routes/user.route.js");

//const users = require('./MOCK_DATA.json')

const app = express()
const PORT = process.env.PORT


//Database (Mongodb) connection 
mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB connection error', err))


//Middleware - plugin
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", userRouter);

//render the "/" route
app.get('/', (req, res) => {
    res.send("Hello Express");
})

//confermation that tha app is running fine on port = 3000
app.listen(PORT, () => {
    console.log(`App is running at PORT: ${PORT}`);
})
