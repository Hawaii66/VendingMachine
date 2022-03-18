import fs from 'fs';
import https from 'https';
import axios from 'axios';

export const GetClient = async() => {
    const agent = new https.Agent({
    cert: fs.readFileSync('./ssl/public.pem', { encoding: 'utf8' }),
    key: fs.readFileSync('./ssl/private.key', { encoding: 'utf8' }),
    ca: fs.readFileSync('./ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
    passphrase:"swish"
    });

    // Using Axios as HTTP library
    const client = axios.create({
    httpsAgent: agent
    });

    return client;
}

export const createId = () => {
    var crypto = require("crypto");
    var id = crypto.randomBytes(20).toString('hex');
    return id.toUpperCase().slice(0,32);
    //return Math.floor(Math.random() * Math.pow(10, 32))
    //return Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":swish"
}

export const test = async () => {
    var client = GetClient();

    const paymentRequest = await createPaymentRequest(client, 100, 'Test Payment');
    console.log(paymentRequest);
}

export async function createPaymentRequest(client:any,amount:number, message:string) {
    const instructionUUID = createId();

    const data = {
        payeeAlias: '1231181189',
        payerAlias:"46704241020",
        currency: 'SEK',
        callbackUrl: 'https://vending.hawaiidev.net/callback',
        amount,
        message,
      };
  
    try {
      console.log(client);
      console.log(data);
      console.log(instructionUUID);

      /*const response = await client.put(
        `https://mss.cpc.getswish.net/swish-cpcapi/api/v2/paymentrequests/${instructionUUID}`,
        data
      );*/

      const response = await client.put(`
      https://staging.getswish.pub.tds.tieto.com/cpc-swish/api/v1/paymentrequests/${instructionUUID}`,data);
  
      if (response.status === 201) {
        const { paymentrequesttoken } = response.headers;
        console.log(response, response.headers);
        console.log(await response.headers.json());
        return { id: instructionUUID, token: paymentrequesttoken };
      }
    } catch (error:any) {
        
        console.log(await error.toJSON())
        console.log("EWRERER")
    }
}

export const newTest = () => {
    const Swish = require("swish-merchant");

    const swish = new Swish({
        alias:"46705453110",
        paymentRequestCallback:"https://blog.hawaiidev.net/req",
        cert: fs.readFileSync('./ssl/public.pem', { encoding: 'utf8' }),
        key: fs.readFileSync('./ssl/private.key', { encoding: 'utf8' }),
        ca: fs.readFileSync('./ssl/Swish_TLS_RootCA.pem', { encoding: 'utf8' }),
        test:true
    }).then((res:any)=>console.log(res))
    .catch((err:any)=>console.log(err))
}