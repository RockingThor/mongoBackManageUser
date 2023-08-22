const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET;

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            //console.log(user);
            req.user = user;
            next();
        });
    } else {
        return res.sendStatus(403);
    }
};

module.exports = {
    authenticateJWT,
};
