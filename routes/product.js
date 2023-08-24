const express = require("express");
const { Shoe } = require("../models/index");
const { authenticateJWT } = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

router.get("/all", async (req, res) => {
    const products = await Shoe.find().limit(50);
    if (products) {
        return res.status(201).json({ data: products });
    } else {
        return res.status(403).json({ error: "Something went wrong" });
    }
});

router.get("/category/:category", authenticateJWT, async (req, res) => {
    const category = req.params.category;
    const regex = new RegExp(category);
    const products = await Shoe.find({
        breadcrumbs: { $regex: regex, $options: "i" },
    });
    if (products) {
        return res.status(202).json({ data: products });
    } else {
        return res.sendStatus(404);
    }
});

module.exports = router;
