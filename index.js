const mongoose = require("mongoose")
require("dotenv").config({ path: "./config/.env" })
const express = require("express")
const { connectDB } = require("./config/db")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const compression = require("compression")
const morgan = require('morgan')
const helmet = require('helmet')
const fs = require('fs')
const path = require('path')
connectDB()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"))
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(compression())
app.use(helmet())
/*
TYPESCRIPT
    mongoDB
        Aggrigation
        cluster
    SQL
        MySQL
        Sequlize
    stream
    concurrency
    GraphQL
    Socket 

*/
app.use(cors({
    origin: "https://appoinment-mern-production.up.railway.app",
    credentials: true
}))

app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/employee", require("./routes/employeeRoute"))
app.use("/api/appointment", require("./routes/appointmentRoute"))

mongoose.connection.once("open", () => {
    console.log("DB CONNECTED")
    app.listen(process.env.PORT || 5000, err => {
        if (err) {
            return console.log("UNABLE TO START SERVER ", err)
        }
        console.log(`SERVER RUNNING ON http://localhost:${process.env.PORT || 5000}`);
    })
})
mongoose.connection.on("error", err => {
    console.log("DB CONNECTION ERROR ", err)
})


