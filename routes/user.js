const express = require("express");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("../middleware/auth");
require("dotenv").config();

const secret = process.env.SECRET;

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { name, email, username, password } = req.headers;
    const userEmailCheck = await User.findOne({ email });
    const userNameCheck = await User.findOne({ username });

    if (userEmailCheck || userNameCheck) {
        return res
            .status(403)
            .json({ error: "user with the email or username already exist" });
    } else {
        const newUser = new User({ name, email, username, password });
        const response = await newUser.save();
        if (response) {
            const token = jwt.sign({ email, username, role: "user" }, secret);
            return res.status(200).json({ id: response._id, token });
        } else {
            return res.status(403).json({ error: "something is broken" });
        }
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.headers;
    const user = await User.findOne({ email });
    if (user._id) {
        if (user.password === password) {
            const token = jwt.sign(
                { email: user.email, username: user.username, role: "user" },
                secret
            );
            return res.status(200).json({ id: user._id, token });
        } else {
            return res.status(403).json({ error: "password doesn't match" });
        }
    } else {
        return res
            .status(403)
            .json({ error: "user doesn't exist with the mail id" });
    }
});

router.post("/verify", authenticateJWT, async (req, res) => {
    const username = req.user.username;
    const user = await User.findOne({ username });
    return res
        .status(200)
        .json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        });
});

module.exports = router;
