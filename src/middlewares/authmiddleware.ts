// // src/middleware/AuthMiddleware.ts

// import { Request, Response, NextFunction } from 'express';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || '';

// // Interface untuk request yang terautentikasi
// export interface AuthenticatedRequest extends Request {
//     id_akun?: string;
//     no_hp?: string;
//     role?: string;
// }

// // Kelas AuthMiddleware
// class AuthMiddleware {
//     private jwtSecret: string;

//     constructor(secret: string = JWT_SECRET) {
//         this.jwtSecret = secret;
//     }

//     public verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
//         const token = req.headers.authorization?.split(' ')[1];

//         if (!token) {
//             res.status(403).json({ message: "No token provided!" });
//             return;
//         }

//         jwt.verify(token, this.jwtSecret, (err, decoded) => {
//             if (err) {
//                 console.error("Error verifying token:", err);
//                 res.status(401).json({ message: "Unauthorized!" });
//                 return;
//             }

//             if (decoded && typeof decoded === 'object') {
//                 req.id_akun = (decoded as JwtPayload).id_akun;
//                 req.no_hp = (decoded as JwtPayload).no_hp;
//                 req.role = (decoded as JwtPayload).role;
//             }

//             next();
//         });
//     }

//     public checkRole(requiredRole: string) {
//         return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
//             if (!req.role) {
//                 res.status(403).json({ message: "Role not found in token!" });
//                 return;  // Pastikan tidak ada nilai yang dikembalikan setelah ini
//             }

//             if (req.role !== requiredRole) {
//                 res.status(403).json({ message: "Anda tidak memiliki akses kesini" });
//                 return;  // Pastikan tidak ada nilai yang dikembalikan setelah ini
//             }

//             next();  // Lanjutkan eksekusi jika role cocok
//         };
//     }
// }

// export default AuthMiddleware;
