import { Request } from "express";

export interface UserType extends Request {
    user?: any;
}

export interface ErrorType {
    email: string;
    password: string;
}