import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as path from "path";
import {getLabels, getEps} from "./database";
dotenv.config();


const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.get('/', async (req: Request, res: Response) => {

    const labels = await getLabels();
    console.log(labels);
    res.render(path.join(__dirname + '/views/pages/index.ejs'), {
        labels: labels,
    });
});
app.get('/eps', async (req: Request, res: Response) => {

    const eps = await getEps();
    res.render(path.join(__dirname + '/views/pages/eps.ejs'), {
        eps: eps,
    });
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
