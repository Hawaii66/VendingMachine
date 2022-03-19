import {Express} from "express"
import { createId, createPaymentRequest, GetClient, newTest } from "../Utils/Swish";
import { AdminRoutes } from "./AdminRoutes";
import { MachineRoutes } from "./V2/MachineRoutes";
import { OrderRoutes } from "./V2/OrderRoutes";
import { RaspRoutes } from "./V2/RaspRoutes";
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import {uuid} from "uuidv4";
import { CanConsume, GetLocation } from "../Database/MachinesDB";
import { ConsumeSlot } from "../Database/MachinesDB";
import { IOrder } from "../Interfaces/Order";
import { AddOrder } from "../Database/OrderDB";


export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).send("Hello World")
    });

    /*app.post("/payment",async (req,res)=>{
        const {product, token, data} = req.body;

        const canConsume = await CanConsume(data.machineID,data.slotIndex);
        if(!canConsume){return res.status(400).send("Error, Det finns ingen godis här!")}

        const location = await GetLocation(data.machineID);
        if(location === null){return res.status(500).send("Error, Kan inte hitta maskinens plats")}

        const idempotencyKey = uuid();

        const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        });

        const chargeResult = await stripe.charges.create({
            amount:product.price * 100,
            currency:"SEK",
            customer:customer.id,
            receipt_email:token.email,
            description:product.name
        },{idempotencyKey});

        await ConsumeSlot(data.machineID,data.slotIndex);
        const orderSettings:IOrder = {
            id:"",
            cost:product.price,
            name:product.name,
            createDate:Date.now(),
            insertDate:Date.now(),
            location:location,
            machineID:data.machineID,
            slotIndex:data.slotIndex
        }

        const order = await AddOrder(orderSettings);
        
        return res.status(200).json({charge:chargeResult,order:order});
    });

    var client = await GetClient();
    const paymentRequest = await createPaymentRequest(client, 100, "Swish message")
    if(paymentRequest === undefined){
        console.log("ERROR 123");
        process.exit();
    }else{
        console.log(paymentRequest)
        
    }
/*
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