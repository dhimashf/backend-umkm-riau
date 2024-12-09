import Database from '../config/db';

class service {
    private db = Database.getInstance().getConnection();

    public async calculate(): Promise<any> {
        const [rows] = await this.db.query('SELECT 1 + 1 AS result');
        return rows;
    }
}

export default service;
