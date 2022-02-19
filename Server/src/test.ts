import fs from 'fs';
import https from 'https';
import axios from 'axios';

export const test = () => {
    const agent = new https.Agent({
    cert: fs.readFileSync('./ssl/public.pem', { encoding: 'utf8' }),
    key: fs.readFileSync('./ssl/private.key', { encoding: 'utf8' }),
    ca: fs.readFileSync('./ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
    });

    console.log(agent);

    // Using Axios as HTTP library
    const client = axios.create({
    httpsAgent: agent
    });
    console.log(client)
}