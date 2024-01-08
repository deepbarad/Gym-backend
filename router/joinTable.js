const express = require("express");
const router = express.Router();
const joinTable = require("../model/joinTable");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");



//get All join Table data "api/admin/joinTable"

router.get(
    "/joinTable", async (req, res) => {
        const Data = await joinTable.find(req.query)
        res.send(Data)
    })


//add table data "api/admin/addTableData"

router.post(
    "/addTableData", [
    body("day", "please Enter day").isLength({ min: 3 }),
    body("time", "please Enter time").isLength({ min: 3 }),
    body("workout", "please Enter workout").isLength({ min: 3 }),
    body("trainerName", "Please Enter trainers").isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { day, time, workout, trainerName } = req.body
    try {
        const TableData = new joinTable({
            day, time, workout, trainerName
        })
        const saveTableData = await TableData.save();
        res.json(saveTableData);
    } catch ({ error }) {
        console.log('error', error)
        res.status(500).send("Internal Server Error");
    }
})

//update table data "api/admin/updateTableData"

router.put(
    "/updateTableData/:id", [
    body("day", "please Enter day").isLength({ min: 3 }),
    body("time", "please Enter time").isLength({ min: 3 }),
    body("workout", "please Enter workout").isLength({ min: 3 }),
    body("trainerName", "Please Enter trainers").isLength({ min: 3 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const { day, time, workout, trainerName } = req.body

        //create a newTableData object
        const newTableData = {};
        if (day) { newTableData.day = day };
        if (time) { newTableData.time = time };
        if (workout) { newTableData.workout = workout };
        if (trainerName) { newTableData.trainerName = trainerName };

        const Data = await joinTable.findByIdAndUpdate(req.params.id, { $set: newTableData }, { new: true })
        res.json(Data);
    } catch (error) {
        console.log('error', error)
    }
})

//Delete table data "api/admin/deleteTableData"

router.delete(
    "/deleteTableData/:id", async (req, res) => {

        const Data = await joinTable.findByIdAndDelete(req.params.id)
        res.json({ "Success": "JoinTable Data has been deleted", Id: Data });
    })

module.exports = router
