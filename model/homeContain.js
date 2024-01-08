const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const homeContainSchema = new Schema({
    bannerContainTitle: {
        type: "string",
        requireL: true,
    },
    bannerContain: {
        type: "string",
        require: true,
    },
    firstContainTitle: {
        type: "string",
        require: true,
    },
    firstContain: {
        type: "string",
        require: true,
    },
    firstImage: {
        type: "string",
        require: true,
    },
    secondContainTitle: {
        type: "string",
        require: true,
    },
    secondContain: {
        type: "string",
        require: true,
    },
    secondImage: {
        type: "string",
        require: true,
    },
    thirdContainTitle: {
        type: "string",
        require: true,
    },
    thirdContain: {
        type: "string",
        require: true,
    },
    thirdImage: {
        type: "string",
        require: true,
    },
    isActive: {
        type: "boolean",
        require: false,
        default: false
    }
});

module.exports = mongoose.model("homeContain", homeContainSchema);
