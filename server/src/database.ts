import dotenv from "dotenv";
import {mockEps, mockLabels} from "./database_mock";

dotenv.config();

const database = require('mariadb');
const pool = database.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

function getLabelsSimulation(label: string)
{
    return label? mockLabels.find((element) => element.name === label): mockLabels;
}
export async function getLabels(label: string) {
    if (process.env.MOCK === 'TRUE')
        return getLabelsSimulation(label);
    let conn;
    try {
        conn = await pool.getConnection();
        let result;
        if (label)
        {
            result = await conn.query("SELECT * from labels where label is "+label+";");
        }
        else
        {
            result = await conn.query("SELECT * from labels;");
        }
        conn.release();
        return result;
    } catch (err) {
        throw err;
    }
}

export async function getEps(label: string) {
    if (process.env.MOCK === 'TRUE') return mockEps;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(`SELECT * from eps WHERE label ='${label}' ORDER BY eps.catid ASC;`);
        conn.release();
        return result;
    } catch (err) {
        throw err;
    }
}
