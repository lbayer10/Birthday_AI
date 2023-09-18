import dotenv from "dotenv";
dotenv.config();

// Authentication Environment Variables
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Server Environment Variables
export const SERVER_HOST = process.env.SERVER_HOST || '127.0.0.1';
export const SERVER_PORT = process.env.SERVER_PORT || 5000;

// MySQL Environment Variables
export const DB_HOST = process.env.DB_HOST || '127.0.0.1';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_DATABASE = process.env.DB_DATABASE || 'birthday_ai';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';