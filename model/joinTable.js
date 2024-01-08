const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const joinTableSchema = new Schema({
    day: {
        type: "string",
        requireL: true
    },
    time: {
        type: "string",
        require: true
    },
    workout: {
        type: "string",
        require: true
    },
    trainerName: {
        type: "string",
        require: true
    }
})

module.exports = mongoose.model("joinTable", joinTableSchema)