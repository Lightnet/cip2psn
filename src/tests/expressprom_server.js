// 
// 

import express from 'express';
import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

const app = express();

app.get('/', async (_req, res) => {
    res.set('Content-Type', register.contentType);
    res.end('Hello World');
});


app.get('/metrics', async (_req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});

app.listen(3000, '0.0.0.0',()=>{
    console.log('INIT SERVER');
});