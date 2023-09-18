import { Router } from "express";
import { check } from "express-validator";
import { signin, signup } from "../controllers/auth.controller";

const router = Router();

/**
 * POST route for user sign-in.
 * 
 * Uses the 'check' middleware from a validation library to validate the email and password fields.
 * 
 * @route   POST api/auth/signin
 * @param   {string} email - The user's email address.
 * @param   {string} password - The user's password.
 * @returns {Object} A response object.
 */
router.post("/signin",
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    signin);

/**
 * POST route for user sign-up.
 * 
 * Uses the 'check' middleware from a validation library to validate the name, email and password fields.
 * 
 * @route   POST api/auth/signup
 * @param   {string} name - The user's name.
 * @param   {string} email - The user's email address.
 * @param   {string} password - The user's password.
 * @returns {Object} A response object.
 */
router.post("/signup", 
    check('name', 'Name is required').exists(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    signup);

export default router;
