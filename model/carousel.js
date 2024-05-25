const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const carouselSchema = new Schema({
    files: {
        type: String,
        requireL: true
    },

})

module.exports = mongoose.model("carousel", carouselSchema)