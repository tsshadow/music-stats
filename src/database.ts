import dotenv from "dotenv";

dotenv.config();

const database = require('mariadb');
const pool = database.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

export async function getLabels() {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query("SELECT * from labels;");
    } catch (err) {
        throw err;
    }
}

export async function getEps() {
    let conn;
    try {
        conn = await pool.getConnection();
        return await conn.query("SELECT * from eps;");
    } catch (err) {
        throw err;
    }
}
