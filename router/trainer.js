const express = require("express");
const uploadMiddleware = require("../middleware/uplodFile");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const trainer = require("../model/trainer");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/trainersImage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });


router.get("/getTrainer", async (req, res) => {
    const trainerData = await trainer.find()

    res.send(trainerData)
    // res.render('the_template', { name: req.body.name });
})

router.post("/addTrainer", upload.single("trainersImage"), async (req, res) => {
    try {
        const { trainerName, age } = req.body

        const trainerData = new trainer({
            trainerName,
            age,
            trainersImage: req?.file?.filename,
        });

        const saveTableData = await trainerData.save();
        if (!res.headersSent) {
            res.json(saveTableData);
        }

    } catch (error) {
        console.log("error", error);
    }
});

router.put("/updateTrainer/:id", upload.single("trainersImage"), async (req, res) => {
    try {

        const { trainerName, age } = req.body


        const Data = await trainer.findByIdAndUpdate(req.params.id, { $set: { trainerName, age, trainersImage: req?.file?.filename } }, { new: true })
        res.json(Data);
    } catch (error) {
        console.log('error', error)
    }

})

router.delete(
    "/deleteTrainer/:id", async (req, res) => {

        const Data = await trainer.findByIdAndDelete(req.params.id)
        res.json({ "Success": "JoinTable Data has been deleted", Id: Data });
    })

module.exports = router;