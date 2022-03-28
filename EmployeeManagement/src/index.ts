import { Request, Response } from 'express';

const exp = require('express')
const app = exp();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
    const response = "Hello World";
    res.send({response}).status(200);
});

app.listen(port, () => console.log(`Running on port ${port}`));