import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret'; // Default untuk mencegah undefined

// Interface untuk request yang terautentikasi
export interface AuthenticatedRequest extends Request {
    id_akun?: string;
    no_hp?: string;
    role?: string;
}

// Kelas AuthMiddleware
class AuthMiddleware {
    private jwtSecret: string;

    constructor(secret: string = JWT_SECRET) {
        this.jwtSecret = secret;
    }

    public verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(403).json({ message: "No token provided or malformed authorization header!" });
                return;
            }

            const token = authHeader.split(' ')[1];

            jwt.verify(token, this.jwtSecret, (err, decoded) => {
                if (err) {
                    console.error("Error verifying token:", err);
                    res.status(401).json({ message: "Unauthorized! Invalid token." });
                    return;
                }

                if (decoded && typeof decoded === 'object') {
                    const payload = decoded as JwtPayload;
                    req.id_akun = payload.id_akun;
                    req.no_hp = payload.no_hp;
                    req.role = payload.role;
                }

                next(); // Lanjutkan ke middleware atau handler berikutnya
            });
        } catch (error) {
            console.error("Unexpected error in verifyToken:", error);
            res.status(500).json({ message: "Internal server error." });
        }
    };

    public checkRole = (...requiredRoles: string[]) => {
        return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
            try {
                if (!req.role) {
                    res.status(403).json({ message: "Role not found in token!" });
                    return;
                }
    
                if (!requiredRoles.includes(req.role)) {
                    res.status(403).json({ message: "Access denied. You do not have the required role." });
                    return;
                }
    
                next(); // Lanjutkan ke middleware atau handler berikutnya
            } catch (error) {
                console.error("Unexpected error in checkRole:", error);
                res.status(500).json({ message: "Internal server error." });
            }
        };
    };    
}

export default AuthMiddleware;
