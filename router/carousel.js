const express = require("express");
const uploadMiddleware = require("../middleware/uplodFile");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const carousel = require("../model/carousel");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/carouselImages");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/getImage", async (req, res) => {
    const carouselData = await carousel.find()
    res.send(carouselData)
    // res.render('the_template', { name: req.body.name });
})


router.post("/addImage", uploadMiddleware, async (req, res) => {
    try {
        const file = req.files;

        file.map(async (file) => {

            await carousel.create({
                files: file.filename
            })

        })
        if (!res.headersSent) {
            return res.status(200).json({ isSuccess: true, message: "File upload successfully" });
        }
        // });

    } catch (error) {
        console.log("error", error);
    }
});

router.put("/updateImage/:id", upload.single("files"), async (req, res) => {
    try {

        await carousel.findByIdAndUpdate(req.params.id, { $set: { files: req?.file?.filename } }, { new: true })

        res.status(200).json({ isSuccess: true, message: "File update successfully" });

    } catch (error) {
        console.log('error', error)
    }

})

router.delete(
    "/deleteImage/:id", async (req, res) => {

        const Data = await carousel.findByIdAndDelete(req.params.id)
        res.json({ "Success": "JoinTable Data has been deleted", Id: Data });
    })

module.exports = router;
