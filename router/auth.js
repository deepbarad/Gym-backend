const express = require("express");
const router = express.Router();
const UserSchema = require("../model/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "NeverGiveUp";

// createUser api "api/auth/createusser"

router.post(
    "/createuser",
    [
        body("name", "please Enter valid name").isLength({ min: 3 }),
        body("email", "please Enter valid email").isEmail(),
        body("password", "password must be at least 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let user = await UserSchema.findOne({ email: req.body.email });
            if (user) {
                return res
                    .status(400)
                    .send({ error: "Sorry a user with this email already exists" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hashSync(req.body.password, salt);

            user = await UserSchema.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword,
            });
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
);

// login user api "api/auth/login"

router.post(
    "/login",
    [
        body("email", "Please Enter valid email").isEmail(),
        body("password", "Please Enter password").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await UserSchema.findOne({ email });
            if (!user) {
                res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                res
                    .status(400)
                    .json({ error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.status(200).send({ authToken });
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
);

//get user api "api/auth/getuser"
router.post(
    "/getuser", fetchUser, async (req, res) => {
        try {
            const userId = req.user.id
            const user = await UserSchema.findById(userId).select("-password")
            res.send(user)

        } catch (error) {
            console.log('error', error)
            res.status(500).send("Internal Server Error");
        }
    })
module.exports = router;
