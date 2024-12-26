import { RowDataPacket } from 'mysql2';
import Database from '../config/database';
import bcrypt from 'bcrypt';

interface Akun {
  id_akun?: number; // Tambahkan id_akun jika ada di database
  no_hp: string;
  password: string;
  role: string;
}

class AkunService {
  private db = Database.getInstance().getConnection();

  // Get all accounts
  public async getAllAkun(): Promise<Akun[]> {
    const [rows] = await this.db.query<RowDataPacket[]>('SELECT * FROM AKUN');
    return rows as Akun[]; // Cast ke Akun[]
  }

  // Get account by phone number
  public async getAkunByPhone(no_hp: string): Promise<Akun | null> {
    const [result]: [RowDataPacket[], any] = await this.db.query(
      'SELECT * FROM AKUN WHERE no_hp = ?',
      [no_hp]
    );
    return result.length > 0 ? (result[0] as Akun) : null; // Cast ke Akun jika ada data
  }
  public async getAkunById(id_akun: number): Promise<Akun | null> {
    const [result]: [RowDataPacket[], any] = await this.db.query(
      'SELECT * FROM AKUN WHERE id_akun = ?',
      [id_akun]
    );
    return result.length > 0 ? (result[0] as Akun) : null; // Cast ke Akun jika ada data
  }


  // Register a new account
public async register(akun: Pick<Akun, 'no_hp' | 'password'>): Promise<boolean> {
    const { no_hp, password } = akun;
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.db.query(
        'INSERT INTO AKUN (no_hp, password) VALUES (?, ?)',
        [no_hp, hashedPassword]
    );
    return true;
}

  // Update account password
  public async updatePassword(no_hp: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result]: any = await this.db.query(
      'UPDATE AKUN SET password = ? WHERE no_hp = ?',
      [hashedPassword, no_hp]
    );
    return result.affectedRows > 0;
  }

  // Validate login credentials
  public async validateLogin(no_hp: string, password: string): Promise<boolean> {
    const akun = await this.getAkunByPhone(no_hp);
    if (!akun) return false;
    return bcrypt.compare(password, akun.password);
  }

  
}

export default AkunService;
