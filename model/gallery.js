const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const gallerySchema = new Schema({
    galleryImage: {
        type: "string",
        requireL: true
    },
    flag: {
        type: "string",
        require: "true"
    }
})

module.exports = mongoose.model("gallery", gallerySchema)