import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import * as path from "path";
import {getLabels, getEps} from "./database";

dotenv.config();

class Label {
    name: string = '';
    eps: number = 0;
}

class Ep {
    label: string = '';
    catid: string = '';
    path: string = '';
}

const app: Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
    res.send('This is the music-stats backend server');
});

app.get('/labels', async (req: Request, res: Response) => {
    console.log(req);
    const labels = await getLabels(<string>req.query.label);
    res.json(labels);
});

app.get('/eps', async (req: Request, res: Response) => {
    const eps = await getEps(<string>req.query.label);
    res.json(eps);
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
