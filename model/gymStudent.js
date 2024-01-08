const { mongoose } = require("mongoose");
const { Schema } = mongoose;

const gymStudentSchema = new Schema({
    firstName: {
        type: "string",
        require: true
    },
    middleName: {
        type: "string",
        require: true
    },
    lastName: {
        type: "string",
        require: true
    },
    email: {
        type: "string",
        require: true
    },
    contactNo: {
        type: "string",
        require: true
    },
    dateOfBirth: {
        type: "string",
        require: true
    },
    state: {
        type: "string",
        require: true
    },
    city: {
        type: "string",
        require: true
    },
    age: {
        type: "string",
        require: true
    },
    currentWeight: {
        type: "number",
        require: true
    },
    desiredWeight: {
        type: "number",
        require: true
    },
    gender: {
        type: "string",
        require: true
    },
    address1: {
        type: "string",
        require: true
    },
    address2: {
        type: "string",
        require: true
    },
    personalTrainer: {
        type: "string",
        require: true
    },
})

module.exports = mongoose.model("gymStudent", gymStudentSchema)