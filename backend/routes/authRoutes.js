const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "96752befa727132e5c7071adb752c4ae05a7a6bfe95551416159f6a0a3f68f1706207b8debbeb675454df83b58a85ea9379a14080bf190b9b719a20a8c091fe6";

// ✅ Test Route
router.get("/test", (req, res) => {
    res.send("Auth Routes Working!");
});

// ✅ Register User
router.post(
    "/register",
    [
        body("name").not().isEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ msg: "User already exists" });

            const hashedPassword = await bcrypt.hash(password, 10);
            user = new User({ name, email, password: hashedPassword });

            await user.save();
            res.status(201).json({ msg: "User registered successfully" });
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    }
);

// ✅ Login User
router.post(
    "/login",
    [body("email").isEmail(), body("password").not().isEmpty()],
    async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
            res.json({ token });
        } catch (error) {
            res.status(500).json({ msg: "Server Error" });
        }
    }
);

module.exports = router;
