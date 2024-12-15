// src/controller/akunController.ts
import { Request, Response } from 'express';
import AkunService from '../services/akunService';
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET || 'default_secret_key';

class AkunController {
    private akunService = new AkunService();

    public async getAkun(req: Request, res: Response): Promise<void> {
        try {
            const accounts = await this.akunService.getAllAkun();
            res.status(200).json({
                success: true,
                data: accounts,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch data',
                error: (error as Error).message,
            });
        }
    }

    public async getAkunByPhone(req: Request, res: Response): Promise<void> {
        const { no_hp } = req.params;
      
        try {
            const account = await this.akunService.getAkunByPhone(no_hp);
            if (!account) {
                res.status(404).json({
                    success: false,
                    message: 'Akun tidak ditemukan.',
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Akun ditemukan.',
                data: account
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Gagal mengambil Akun.',
                error: (error as Error).message,
            });
        }
    }

public async register(req: Request, res: Response): Promise<void> {
    const { no_hp, password } = req.body;

    if (!no_hp || !password) {
        res.status(400).json({ success: false, message: 'Nomor HP dan password wajib diisi.' });
        return;
    }

    try {
        const existingAkun = await this.akunService.getAkunByPhone(no_hp);
        if (existingAkun) {
            res.status(400).json({ success: false, message: 'Nomor HP sudah terdaftar.' });
            return;
        }

        // Perbaiki pemanggilan fungsi register
        await this.akunService.register({ no_hp, password });
        res.status(201).json({ success: true, message: 'Registrasi berhasil.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Terjadi kesalahan saat registrasi.', error });
    }
}


    public async login(req: Request, res: Response): Promise<void> {
        const { no_hp, password } = req.body;

        if (!no_hp || !password) {
            res.status(400).json({ success: false, message: 'Nomor HP dan password wajib diisi.' });
            return;
        }

        const akun = await this.akunService.getAkunByPhone(no_hp);
        if (!akun) {
            res.status(401).json({ success: false, message: 'Nomor HP atau password salah.' });
            return;
        }
        try {

            const isValid = await this.akunService.validateLogin(no_hp, password);
            if (!isValid) {
                res.status(401).json({ success: false, message: 'Nomor HP atau password salah.' });
                return;
            }

            // Generate JWT
            const token = jwt.sign({ 
                id_akun: akun.id_akun,
                role: akun.role },
                secretKey,
                { expiresIn: '1h' }
            );

            res.status(200).json({ 
                success: true,
                message: 'Login berhasil.', 
                token,
                id_akun: akun.id_akun,
                no_hp: akun.no_hp,
                role: akun.role });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Terjadi kesalahan saat login.', error });
        }
    }

    public async forgotPassword(req: Request, res: Response): Promise<void> {
        const { no_hp, newPassword } = req.body;

        if (!no_hp || !newPassword) {
            res.status(400).json({ success: false, message: 'Nomor HP dan password baru wajib diisi.' });
            return;
        }

        try {
            const existingAkun = await this.akunService.getAkunByPhone(no_hp);
            if (!existingAkun) {
                res.status(404).json({ success: false, message: 'Akun dengan nomor HP tersebut tidak ditemukan.' });
                return;
            }

            await this.akunService.updatePassword(no_hp, newPassword);
            res.status(200).json({ success: true, message: 'Password berhasil diperbarui.' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memperbarui password.', error });
        }
    }
}

export default AkunController;