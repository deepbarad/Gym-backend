const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const trainerSchema = new Schema({
    trainerName: {
        type: "string",
        requireL: true
    },

    age: {
        type: "string",
        requireL: true
    },
    trainersImage: {
        type: "string",
        requireL: true
    },

})

module.exports = mongoose.model("trainer", trainerSchema)