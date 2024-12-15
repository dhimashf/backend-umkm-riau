import { Request, Response, NextFunction } from 'express';

// Create a class for role-based access control
class RoleMiddleware {
    // private requiredRole: string;

    // constructor(requiredRole: string) {
    //     this.requiredRole = requiredRole;
    // }

    // // Middleware function to check role
    // public checkRole(req: Request, res: Response, next: NextFunction): void {
    //     if (req.role !== this.requiredRole) {
    //         return res.status(403).json({ message: 'Access denied. You are not authorized to perform this action.' });
    //     }
    //     next();
    // }
}

export default RoleMiddleware;
