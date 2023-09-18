import { Router } from "express";
import { check } from "express-validator";
import { insertBirth } from "../controllers/birthday.controller";

const router = Router();

/**
 * POST route for user insert birthday.
 * 
 * Uses the 'check' middleware from a validation library to validate the name and birthday fields.
 * 
 * @route   POST api/birthday/insert-birth
 * @param   {string} name - The user's name.
 * @param   {date} birthday - The user's birthday.
 * @returns {Object} A response object.
 */
router.post("/insert-birth",
    check('name', 'Password is required').exists(),
    check('birthday', 'Birthday is required').exists(),
    insertBirth);

export default router;
