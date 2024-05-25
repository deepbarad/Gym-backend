const express = require("express");
const router = express.Router();
const aboutContainSchema = require("../model/aboutContain");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/aboutContainImage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/getAboutContain", async (req, res) => {
    const aboutContainData = await aboutContainSchema.find();
    res.send(aboutContainData);
});

router.post("/addAboutContain", upload.single("aboutImage"), async (req, res) => {
    try {
        const { aboutContainTitle, aboutContain } = req.body;

        const aboutContainData = new aboutContainSchema({
            aboutContainTitle,
            aboutImage: req.file.filename,
            aboutContain
        });
        const saveTableData = await aboutContainData.save();
        res.json(saveTableData);
    } catch (error) {
        console.log("error", error);
    }
});

router.put(
    "/updateAboutContain/:id",
    upload.single("aboutImage"),
    async (req, res) => {
        try {
            const {
                aboutContainTitle, aboutContain
            } = req.body;

            await aboutContainSchema.updateMany({ isActive: false })

            const Data = await aboutContainSchema.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        aboutContainTitle, aboutImage: req?.file?.filename, aboutContain, isActive: req?.query?.isActive === undefined ? false : req?.query?.isActive
                    },
                },
                { new: true }
            );
            res.json(Data);
        } catch (error) {
            console.log("error", error);
        }
    }
);

router.delete(
    "/deleteAboutContain/:id", async (req, res) => {

        const Data = await aboutContainSchema.findByIdAndDelete(req.params.id)
        res.json({ "Success": "HomeContain Data has been deleted", Id: Data });
    })

module.exports = router;