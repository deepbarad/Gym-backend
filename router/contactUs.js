const express = require("express");
const router = express.Router();
const contactUs = require("../model/contactUs")

router.get("/getContactUs", async (req, res) => {
    const contactUsData = await contactUs.find()
    res.send(contactUsData)
    // res.render('the_template', { name: req.body.name });
})


router.post("/addContactUs", async (req, res) => {
    try {
        const { name, email, message } = req.body
        const contactUsData = new contactUs({
            name, email, message
        });
        const saveTableData = await contactUsData.save();
        res.json(saveTableData);

    } catch (error) {
        console.log("error", error);
    }
});

router.delete(
    "/deleteContactUs/:id", async (req, res) => {

        const Data = await contactUs.findByIdAndDelete(req.params.id)
        res.json({ "Success": "ContactUs Data has been deleted" });
    })


module.exports = router;