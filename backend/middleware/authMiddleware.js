const jwt = require("jsonwebtoken");
const JWT_SECRET = "96752befa727132e5c7071adb752c4ae05a7a6bfe95551416159f6a0a3f68f1706207b8debbeb675454df83b58a85ea9379a14080bf190b9b719a20a8c091fe6";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;
