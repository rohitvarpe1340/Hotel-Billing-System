import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

    const token =
        req.headers.authorization?.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Token Missing"
        });

    }

    jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decoded) => {

            if (err) {

                return res.status(403).json({
                    message: "Invalid Token"
                });

            }

            req.user = decoded;
            console.log("TOKEN USER:", req.user);
        console.log("USER ID:", req.user.id);

            next();
        }
    );
};

export default verifyToken;