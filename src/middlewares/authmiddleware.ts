import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
import database from '../config/database';

const secretKey = process.env.JWT_SECRET;

class authmiddleware {
//   // Method untuk memverifikasi token JWT dan mengecek peran berdasarkan role
//   public static async checkRole(role: string) {
//     return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//       const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header Authorization

//       if (!token) {
//         return res.status(403).json({ success: false, message: 'Token tidak ditemukan.' });
//       }

//       try {
//         // Verifikasi token
//         const decoded: any = jwt.verify(token, secretKey);

//         // Ambil data akun dari database berdasarkan id akun yang ada pada token
//         const user = await db.query('SELECT * FROM AKUN WHERE id_akun = ?', [decoded.id_akun]);

//         if (!user[0]) {
//           return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan.' });
//         }

//         // Periksa apakah role pengguna sesuai dengan yang dibutuhkan
//         if (user[0].role !== role) {
//           return res.status(403).json({
//             success: false,
//             message: `Akses ditolak. Hanya dengan role ${role} yang diperbolehkan.`,
//           });
//         }

//         // Menambahkan informasi pengguna ke objek request
//         req.user = user[0];

//         // Melanjutkan ke route handler berikutnya
//         next();
//       } catch (error) {
//         return res.status(401).json({ success: false, message: 'Token tidak valid.' });
//       }
//     };
//   }
}

export default authmiddleware;
