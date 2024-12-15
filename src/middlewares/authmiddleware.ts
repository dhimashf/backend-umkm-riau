// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

interface AuthenticatedRequest extends Request {
    id_akun?: string;
    no_hp?: string;
    role?: string; // Add `peran` field
}


export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(403).json({ message: "No token provided!" });
        return;
    }

    // src/middleware/auth.ts

jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error("Error verifying token:", err);
        res.status(401).json({ message: "Unauthorized!" });
        return;
    }

    if (decoded && typeof decoded === 'object') {
        req.id_akun = (decoded as JwtPayload).id_akun;
        req.no_hp = (decoded as JwtPayload).no_hp;
        req.role = (decoded as JwtPayload).role; // Include the role (`peran`)
    }

    next();
});

};