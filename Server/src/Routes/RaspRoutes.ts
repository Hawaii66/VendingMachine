import {Express} from "express"
import { AuthRasp } from "../Utils/Middelware";
import { GetOrdersMachine, RemoveOrder } from "../Database/OrderDB";
import { GetID } from "../Database/MachinesDB";

export const RaspRoutes = (app:Express) => {
    /*app.get("/rasp/orders/:id", AuthRasp, async (req,res)=>{
        const machineID = req.params.id;
        
        const orders = await GetOrdersMachine(machineID);

        res.status(200).json(orders);
    });

    app.get("/rasp/order/:id", AuthRasp, async(req,res)=>{
        const machineID = req.params.id;
        
        const orders = await GetOrdersMachine(machineID);
        
        if(orders.length === 0)
        {
            return res.status(204).send("No order available for the machine");
        }

        const order = await RemoveOrder(orders[0].id);
        const machine = await GetID(order.machineID);
        if(machine === null || machine.slots.length <= order.slotIndex){
            return res.status(204).send("Error getting machine slot!");
        }

        const slot = machine.slots[order.slotIndex];

        res.status(200).json(
            {
                order:order,
                slot:slot
            }
        );
    });*/
}