const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/gym"
mongoose.set('strictQuery', true);
const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connect to Mongo Successfully")
    })
};

module.exports = connectToMongo;