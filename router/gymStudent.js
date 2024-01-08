const express = require("express");
const router = express.Router();
const gymStudent = require("../model/gymStudent")

router.get("/getGymStudent", async (req, res) => {
    const gymStudentData = await gymStudent.find()
    res.send(gymStudentData)
})


router.post("/addGymStudent", async (req, res) => {
    try {
        const { firstName, middleName, lastName, email, contactNo, dateOfBirth, state, city, age, currentWeight, desiredWeight, gender, address1, address2, personalTrainer } = req.body
        const gymStudentData = new gymStudent({
            firstName, middleName, lastName, email, contactNo, dateOfBirth, state, city, age, currentWeight, desiredWeight, gender, address1, address2, personalTrainer
        });
        const saveTableData = await gymStudentData.save();
        res.json(saveTableData);

    } catch (error) {
        console.log("error", error);
    }
});

router.delete(
    "/deleteGymStudent/:id", async (req, res) => {

        const Data = await gymStudent.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Gym Student Data has been deleted" });
    })


module.exports = router;