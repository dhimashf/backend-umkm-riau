import app from '.';
import Database from './config/database';

const PORT = process.env.PORT ||3306;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Use the Database instance to perform a simple query
async function testDatabaseConnection() {
    const db = Database.getInstance().getConnection(); // Get the pool connection
    try {
        // Querying the database to test connection
        const [rows] = await db.query('SELECT 1 + 1 AS result');
        console.log('Database connected!', rows); // Output the result of the query
    } catch (err: unknown) {
        if (err instanceof Error) {
            // If the error is an instance of Error, we can safely access the message
            console.error('Failed to connect to the database:', err.message);
        } else {
            // If it's not an instance of Error, handle it as an unknown type
            console.error('An unknown error occurred:', err);
        }
    }
}

// Test the database connection
testDatabaseConnection();
