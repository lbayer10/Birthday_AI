import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { db } from "../config/dbConfig";

export const insertBirth: RequestHandler = (req, res) => {
    const errors = validationResult(req);
    const { name, birthday, uId } = req.body;

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Add Birthday
    try {
        db.query(
            `INSERT INTO birthdays (bName, bBirthday, uId) VALUES(?, ?, ?)`,
            [name, birthday, uId],
            (err, newBirth) => {
                if (err) {
                    throw new Error(`Birthday INSERT ERR :=> ${err}`);
                }
                res.status(200).json(newBirth);
            }
        );
    } catch (err) {
        console.error(err);
    }
}