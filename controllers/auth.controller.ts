import bcrypt from "bcryptjs";
import isEmpty from "is-empty";
import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { db } from "../config/dbConfig";
import { ErrorType } from "../types/auth.type";
import generateToken from "../utils/generateTokens";

export const signup: RequestHandler = async (req, res) => {
    const errors = validationResult(req);
    const { name, email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Encrypt the password to hash value
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Add User
    try {
        db.query(
            `INSERT INTO users (uName, uEmail, uPassword) VALUES(?, ?, ?)`,
            [name, email, hash],
            (err, newUser) => {
                if (err) {
                    throw new Error(`USER INSERT ERR :=> ${err}`);
                }
                res.status(200).json(newUser);
            }
        );
    } catch (err) {
        console.error(err);
    }
};

export const signin: RequestHandler = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let signinError: ErrorType = {
        email: "",
        password: ""
    };

    try {
        db.query(
            `SELECT * from users WHERE uEmail = ?`,
            [email],
            async (err, result) => {
                if (err) {
                    throw new Error(`USER FIND SELECT ERR :=> ${err}`);
                }

                if (isEmpty(result[0])) {
                    signinError = { ...signinError, email: "User Not exists!" };
                    return res.status(404).json(signinError);
                }
                const user = result[0];

                // Encrypt the password to hash value
                if (!bcrypt.compareSync(password, user.uPassword)) {
                    signinError = { ...signinError, password: "Password is not matched!" };
                    return res.status(400).json(signinError);
                }

                const loggedUser = user;

                res.status(201).json({
                    user: loggedUser,
                    token: generateToken({ user: loggedUser })
                });
            }
        );
    } catch (err) {
        res.status(500).json(err);
    }
};
