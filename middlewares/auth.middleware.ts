import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { UserType } from "../types/auth.type";
import { JWT_SECRET } from "../config/envConfig";

export const auth = (req: UserType, res: Response, next: NextFunction) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Verify jwt token
    try {
        jwt.verify(
            token,
            JWT_SECRET as string,
            (error, decoded: any) => {
                if (error) {
                    throw new Error("Your token has been expired");
                } else {
                    req.user = decoded.user;
                    next();
                }
            }
        );
    } catch (err) {
        res.status(401).json(err);
    }
};