import jwt from "jsonwebtoken";

export const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized User" });
        }

        const token = authHeader.split(" ")[1];

        // if (!token) {
        //     return res.status(401).json({ message: "Token missing" });
        // }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next();
    } catch (error) {
        console.log(`Error in authorization middleware: ${error.message}`);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
export default authorize;