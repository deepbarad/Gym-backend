const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const homeContain = require("../model/homeContain");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/homeContainImage");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const fields = [
    { name: "firstImage", maxCount: 1 },
    { name: "secondImage", maxCount: 1 },
    { name: "thirdImage", maxCount: 1 },
];

router.get("/getHomeContain", async (req, res) => {
    const homeContainData = await homeContain.find();
    res.send(homeContainData);
});

router.post("/addHomeContain", upload.fields(fields), async (req, res) => {
    try {
        const {
            bannerContainTitle,
            bannerContain,
            firstContainTitle,
            firstContain,
            secondContainTitle,
            secondContain,
            thirdContainTitle,
            thirdContain,
        } = req.body;

        const homeContainData = new homeContain({
            bannerContainTitle,
            bannerContain,
            firstContainTitle,
            firstContain,
            firstImage: req?.files["firstImage"][0]?.filename,
            secondContainTitle,
            secondContain,
            secondImage: req?.files["secondImage"][0]?.filename,
            thirdContainTitle,
            thirdContain,
            thirdImage: req?.files["thirdImage"][0]?.filename,
        });
        const saveTableData = await homeContainData.save();
        res.json(saveTableData);
    } catch (error) {
        console.log("error", error);
    }
});

router.put(
    "/updateHomeContain/:id",
    upload.fields(fields),
    async (req, res) => {
        try {
            const {
                bannerContainTitle,
                bannerContain,
                firstContainTitle,
                firstContain,
                secondContainTitle,
                secondContain,
                thirdContainTitle,
                thirdContain,
            } = req.body;

            await homeContain.updateMany({ isActive: false })

            const obj = req?.files;


            const Data = await homeContain.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        bannerContainTitle,
                        bannerContain,
                        firstContainTitle,
                        firstContain,
                        firstImage: obj?.firstImage !== undefined ? req?.files["firstImage"][0].filename : req?.body?.firstImage,
                        secondContainTitle,
                        secondContain,
                        secondImage: obj?.secondImage !== undefined ? req?.files["secondImage"][0].filename : req?.body?.secondImage,
                        thirdContainTitle,
                        thirdContain,
                        thirdImage: obj?.thirdImage !== undefined ? req?.files["thirdImage"][0].filename : req?.body?.thirdImage,
                        isActive: req?.query?.isActive === undefined ? false : req?.query?.isActive
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
    "/deleteHomeContain/:id", async (req, res) => {

        const Data = await homeContain.findByIdAndDelete(req.params.id)
        res.json({ "Success": "HomeContain Data has been deleted", Id: Data });
    })

module.exports = router;
