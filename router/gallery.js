const express = require("express");
const uploadMiddleware = require("../middleware/uplodFile");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const gallery = require("../model/gallery");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/galleryImage");
    },
    filename: async (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const fields = [
    { name: "galleryImage", maxCount: 20 },
];

router.get("/getGallery", async (req, res) => {
    const galleryData = await gallery.find()
    res.send(galleryData)
})

router.post("/addGallery", upload.fields(fields), async (req, res) => {
    const file = await req.files.galleryImage

    try {

        file?.map(async (file) => {
            await gallery.create({
                galleryImage: file.filename,
                flag: file.mimetype.toString().split("/")[0]
            })

        })
        if (!res.headersSent) {
            return res.status(200).json({ isSuccess: true, message: "File upload successfully" });
        }



    } catch (error) {
        console.log("error", error);
    }
});

router.put("/updateGallery/:id", upload.fields(fields), async (req, res) => {

    const file = await req.files.galleryImage
    try {

        file?.map(async (file) => {
            await gallery.findByIdAndUpdate(
                req.params.id,
                {
                    $set: {
                        galleryImage: file?.filename,
                        flag: file.mimetype.toString().split("/")[0],
                    },
                },
                { new: true }
            );
        })
        if (!res.headersSent) {
            return res.status(200).json({ isSuccess: true, message: "File update successfully" });
        }
    } catch (error) {
        console.log('error', error)
    }


})

router.delete(
    "/deleteGallery/:id", async (req, res) => {

        const Data = await gallery.findByIdAndDelete(req.params.id)
        res.json({ "Success": "JoinTable Data has been deleted", Id: Data });
    })

module.exports = router;