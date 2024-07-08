import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export async function UserAuth(req: any, res: Response, next: NextFunction) {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(401).send('Unauthorized')
        }
        const [authType, token] = header.split(' ');

        if (authType !== 'Bearer' || !token) {
            return res.status(401).send('Unauthorized')
        }

        const data: any = jwt.verify(token, config.jwt_secret);
        if (!data) {
            return res.status(401).send('Unauthorized')
        }
        req.params.id = data?.id
        next()
    } catch (error) {
        return res.status(401).send('Unauthorized')
    }
}