import * as serviceAccount from './warung-umkm-1410-firebase-adminsdk-pxzdk-e23d123355.json'; // Path ke private key Anda

// Konfigurasi Firebase
export const firebaseConfig = {
  credential: serviceAccount,
  databaseURL: 'https://warung-umkm-1410.firebaseio.com', // Ganti dengan URL database Firebase Anda
};
