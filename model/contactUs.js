const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const contactUsSchema = new Schema({
    name: {
        type: "string",
        requireL: true
    },
    email: {
        type: "string",
        requireL: true
    },
    message: {
        type: "string",
        requireL: true
    },

})

module.exports = mongoose.model("contactUs", contactUsSchema)