import {Express} from "express"
import { createPaymentRequest, GetClient, newTest } from "../Utils/Swish";
import { AdminRoutes } from "./AdminRoutes";
import { MachineRoutes } from "./MachineRoutes";
import { OrderRoutes } from "./OrderRoutes";
import { RaspRoutes } from "./RaspRoutes";
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import {uuid} from "uuidv4";


export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).send("Hello World")
    });

    app.post("/payment",(req,res)=>{
        const {product, token} = req.body;

        const idempotencyKey = uuid();

        return stripe.customers.create({
            email:token.email,
            source:token.id
        }).then((customer: any)=>{
            stripe.charges.create({
                amount:product.price * 100,
                currency:"SEK",
                customer:customer.id,
                receipt_email:token.email,
                description:product.name
            },{idempotencyKey})
            .then((result: any)=>{console.log(result);res.status(200).json(result);})
            .catch((err: any)=>{console.log(err);res.status(500).json({
                message:"Error, något gick fel vid köpet"
            })});
        });
    });

    /*var client = await GetClient();
    //createPaymentRequest(client, 100, "Swish message")

    const paymentRequest = await createPaymentRequest(client, 100, 'Test Payment');
    console.log(paymentRequest)
    /*if (paymentRequest === undefined){
        console.log("ERROR§12");
        return;
    }
    const callbackUrl = `https://localhost:3000/receipt?ref=${paymentRequest.id}`;
    const appUrl = `swish://paymentrequest?token=${paymentRequest.token}&callbackurl=${callbackUrl}`;

    // Open or redirect the user to the url
    console.log(appUrl);*/

    AdminRoutes(app);
    MachineRoutes(app);
    OrderRoutes(app);
    RaspRoutes(app);
}