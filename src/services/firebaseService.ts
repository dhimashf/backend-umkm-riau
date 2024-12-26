// src/services/firebaseService.ts
import firebase from 'firebase-admin'; // Pastikan Anda sudah menginstal firebase-admin

class FirebaseService {
  private static instance: FirebaseService;
  private otpStore: { [key: string]: string } = {}; // Add this line to store OTPs temporarily

  private constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp({
        credential: firebase.credential.applicationDefault(),
      });
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  // Mengirim OTP ke nomor HP
  public async sendOTP(no_hp: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store the OTP temporarily in the otpStore object
    this.otpStore[no_hp] = otp;
    console.log(`OTP sent to ${no_hp}: ${otp}`);
    return otp; // In a real scenario, you wouldn't send OTP in the response
  }
  
  // Memverifikasi OTP
  public async verifyOTP(no_hp: string, otp: string): Promise<boolean> {
    console.log(`Verifying OTP for ${no_hp}: ${otp}`);
    // Compare the OTP with the one stored in memory
    return this.otpStore[no_hp] === otp; // Return true if OTP matches
  }
}

export default FirebaseService;
