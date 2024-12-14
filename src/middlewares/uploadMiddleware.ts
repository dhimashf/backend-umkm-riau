import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary'; // Pastikan ini sesuai dengan konfigurasi Cloudinary Anda

// Mengonfigurasi Multer dengan Cloudinary
class UploadMiddleware {
    private storage: CloudinaryStorage;

    constructor(folder: string, allowedFormats: string[], transformations?: object[]) {
        this.storage = new CloudinaryStorage({
            cloudinary,
            params: async (req, file) => ({
                folder, // Folder di Cloudinary
                resource_type: 'image', // Pastikan hanya mengunggah tipe gambar
                public_id: `${Date.now()}-${file.originalname}`, // Penamaan unik untuk file
                format: allowedFormats.length > 0 ? allowedFormats[0] : undefined, // Format default
                transformation: transformations, // Transformasi gambar, misalnya mengubah ukuran
            }),
        });
    }

    // Mendapatkan instance multer untuk digunakan dalam routing
    public getMulterInstance() {
        return multer({ storage: this.storage });
    }
}

// Middleware upload file untuk produk
const productUploadMiddleware = new UploadMiddleware('products', ['jpg', 'png', 'jpeg'], [
    { width: 500, height: 500, crop: 'limit' },
]);

// Mengekspos middleware sebagai instance
export const upload = productUploadMiddleware.getMulterInstance();
