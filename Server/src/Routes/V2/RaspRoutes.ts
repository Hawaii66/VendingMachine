import {Express, NextFunction} from "express";
import { GetSlot } from "../../Database/Postgres/MachineSQL";
import { GetMachine } from "../../Database/Postgres/MachineSQL";
import { GetOrdersMachine, RemoveRaspOrder } from "../../Database/Postgres/OrderSQL";
import { AuthRasp } from "../../Utils/Middelware";

export const RaspRoutes = (app:Express) => {
    app.get("/v2/rasp/check/:id",AuthRasp,async(req,res)=>{
        const  {id} = req.params;
        const orders = await GetOrdersMachine(id);

        if(!orders){return res.status(500).send("No orders found with that machine ID");}
        if(orders.length === 0){return res.status(200).send("No order has been made this time");}

        console.log(orders);

        const slot = await GetSlot(orders[0].slotID);
        await RemoveRaspOrder(orders[0].id);

        res.status(200).json(slot);
    });
}