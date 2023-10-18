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
    if (process.env.MOCK === 'TRUE') {
        console.log('Mock is true: ');
        return getLabelsSimulation(label);
    }
    let conn;
    try {
        conn = await pool.getConnection();
        let result;
        if (label)
        {
            const query = `SELECT labels.name, count(*) as 'songs', count(DISTINCT eps.path) as 'eps' FROM \`songs\`
                          JOIN \`labels\` ON songs.label_id = labels.id
                          JOIN \`eps\` on songs.ep_id = eps.id
                          WHERE labels.name ='${label}' 
                          GROUP BY songs.label_id LIMIT 1;`;
            result = await conn.query(query);
            result = { songs: Number(result[0]['songs']), eps: Number(result[0]['eps']), name: result[0]['name']};
            console.log(result);
        }
        else
        {
            const query = `SELECT labels.name, count(*) as 'songs', count(DISTINCT eps.path) as 'eps' FROM \`songs\`
                          JOIN \`labels\` ON songs.label_id = labels.id
                          JOIN \`eps\` on songs.ep_id = eps.id 
                          GROUP BY songs.label_id`;
            result = await conn.query(query);
            result.forEach((res: any) => {
                res.eps = Number(res['eps'])
                res.songs = Number(res['songs'])
            });
            console.log(result);
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
