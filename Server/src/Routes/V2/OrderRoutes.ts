import {Express} from "express";
import { CanConsume, ConsumeSlot, GetCandyFromSlot, GetLocation, GetMachine, GetSlot } from "../..//Database/Postgres/MachineSQL";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
import {uuid} from "uuidv4";
import { IOrder } from "../../Interfaces/Order";
import { AddOrder, AddRaspOrder, GetOrder } from "../../Database/Postgres/OrderSQL";
import { ICandy, IMachine, ISlot } from "../../Interfaces/MachineInterface";

export const OrderRoutes = (app:Express) => {
    app.post("/v2/payment/stripe", async(req,res)=>{
        const {token, data} = req.body;

        const machine:IMachine|null = await GetMachine(data.machineID);
        if(machine === null){return res.status(400).send("Error, Hittade ingen maskin med rätt machineID");}

        const slot:ISlot|null = await GetSlot(data.slotID);
        if(slot === null){return res.status(400).send("Error, Ingen slot hittades vid sloten")}

        const candy:ICandy|null = await GetCandyFromSlot(data.slotID);
        if(candy === null){return res.status(400).send("Error, Ingen godis hittades vid slotID:et");}

        const canConsume = await CanConsume(data.machineID,data.slotID);
        if(!canConsume){return res.status(400).send("Error, Det finns ingen godis här!");}

        if(!token){return res.status(400).send("No token available");}

        const idempotencyKey = uuid();

        /*const customer = await stripe.customers.create({
            email:token.email,
            source:token.id
        });

        const chargeResult = await stripe.charges.create({
            amount:slot.amount * 100,
            currency:"SEK",
            customer:customer.id,
            receipt_email:token.email,
            description:candy.name
        },{idempotencyKey});*/

        await ConsumeSlot(data.slotIndex);

        const orderSettings:IOrder = {
            id:"",
            purchaseDate:Date.now(),
            machineID:data.machineID,
            slotID:data.slotID,
            candyID:candy.id,
            location:machine.id
        }

        const order = await AddOrder(orderSettings);
        console.log(order);
        await AddRaspOrder(order);
        
        return res.status(200).json({/*charge:chargeResult,*/order:order});
    });

    app.get("/v2/orders/get/:id",async(req,res)=>{
        const id = req.params.id;
        if(!id){return res.status(400).send("No order ID available");}

        const order = await GetOrder(id);
        res.status(200).json(order);
    });
}