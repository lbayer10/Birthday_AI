import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig";

const generateToken = (user: any) => {
    const token = jwt.sign(user, JWT_SECRET as string, { expiresIn: "10d" });
    return token;
};

export default generateToken;
