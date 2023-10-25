import https from 'https';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import {universalTracker} from './routes/universal_tracker.js';

const port = 8080
dotenv.config();

const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

const app = express();
const server = https.createServer(httpsOptions, app);

app.use(express.json());
app.use('/', universalTracker);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});