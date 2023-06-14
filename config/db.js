const mongoose = require("mongoose")

exports.connectDB = () => {
    console.log(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL)
}
