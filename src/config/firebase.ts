import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Firebase configuration for Node.js backend
const firebaseConfig = {
  apiKey: "API",  // Gantilah dengan apiKey Anda
  authDomain: "WARUNG", // Gantilah dengan authDomain Anda
  projectId: "warung",  // Gantilah dengan projectId Anda
  storageBucket: "warung", // Gantilah dengan storageBucket Anda
  messagingSenderId: "", // Gantilah dengan messagingSenderId Anda
  appId: "1:", // Gantilah dengan appId Anda
  measurementId: "GP", // Gantilah dengan measurementId Anda
};

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig), // Gunakan credential yang sesuai
});

export default admin;
