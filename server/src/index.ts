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

app.get('/labels', async (req: Request, res: Response) => {
    const labels = await getLabels();
    // const labels: Label[] = [{name: 'a', eps: 1}, {name: 'abc', eps: 33}, {name: 'def', eps: 10}];
    res.json(labels);
});

app.get('/eps', async (req: Request, res: Response) => {
    const eps = await getEps(<string>req.query.label);
    // const eps: Ep[] = [{label: 'a', catid: 'cat1', path: 'path1'},
    //     {label: 'abc', catid: 'cat2', path: 'path2'},
    //     {label: 'def', catid: 'cat3', path: 'path3'}];
    res.json(eps);
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
