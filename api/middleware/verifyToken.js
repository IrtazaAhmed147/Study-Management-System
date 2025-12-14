import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/responseHandler.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return errorHandler(res, 401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if (err) return errorHandler(res, 403, "Token expired or invalid")
        req.user = user 

        next()
    })
}

export const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.isAdmin !== true) {
        return errorHandler(res, 403, "Access denied: Admin only");
    }
    next();
};
