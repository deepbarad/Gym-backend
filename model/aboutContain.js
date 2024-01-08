const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const aboutContainSchema = new Schema({
    aboutContainTitle: {
        type: "string",
        requireL: true,
    },
    aboutImage: {
        type: "string",
        require: true,
    },
    aboutContain: {
        type: "string",
        require: true,
    },
    isActive: {
        type: "boolean",
        require: false,
        default: false
    }
});

module.exports = mongoose.model("aboutContain", aboutContainSchema);
