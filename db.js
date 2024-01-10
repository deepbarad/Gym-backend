const mongoose = require("mongoose");

const mongoURL = "mongodb+srv://deepbarad8:5Gdn2P43OepPoHO8@hari-om-gym.xeigk0p.mongodb.net/"
mongoose.set('strictQuery', true);
const connectToMongo = () => {
    mongoose.connect(mongoURL, () => {
        console.log("Connect to Mongo Successfully")
    })
};

module.exports = connectToMongo