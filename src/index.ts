import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as path from "path";
import {getLabels, getEps} from "./database";
dotenv.config();

class Label {
    name: string = '';
    eps: number = 0;
}
const app: Express = express();
const port = process.env.PORT;

app.set('view engine', 'ejs');

app.get('/', async (req: Request, res: Response) => {

    const labels: Label[] = await getLabels();
    let chartData: number[] = [];
    let chartLabel: string[] = [];
    labels.forEach((label) => {
        chartData.push(label.eps);
        chartLabel.push("'"+label.name+"'");
    })
    res.render(path.join(__dirname + '/views/pages/index.ejs'), {
        labels: labels,
        chartData: chartData,
        chartLabel:chartLabel,
    });
});

app.get('/eps', async (req: Request, res: Response) => {
    const eps = await getEps(<string>req.query.label);

    res.render(path.join(__dirname + '/views/pages/eps.ejs'), {
        eps: eps,
    });
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
