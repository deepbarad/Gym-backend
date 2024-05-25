const mongoose = require("mongoose");

// const mongoURL = "mongodb+srv://deepbarad8:k6NhSxvzOZwWn82P@cluster0.utywyap.mongodb.net/"
const mongoURL = "mongodb://localhost:27017/gym"

mongoose.set('strictQuery', true);
const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connect to Mongo Successfully")
    })
};

module.exports = connectToMongo