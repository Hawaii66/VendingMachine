import {Express} from "express"
import { IOrder, IOrderPublic } from "../Interfaces/Order";
import { AddOrder, GetAllOrders, GetFullOrder, GetOrder } from "../Database/OrderDB";
import { AuthToken } from "../Utils/Middelware"
import { GetID } from "../Database/MachinesDB";

export const OrderRoutes = (app:Express) => {
    app.get("/orders",AuthToken, async (req,res)=>{
        const orders = await GetAllOrders();
        res.status(200).json(orders);
    });

    /*app.get("/orders/:id",async(req,res)=>{
        const id = req.params.id;
        if(id === null){res.status(400).send("No id available");}

        const order = await GetFullOrder(id);
        if(order === null){return res.status(400).send("Cant find a order with that id");}

        const machine = await GetID(order.machineID);
        if(machine === null){return res.status(500).send("Cant find machine that made the order");}

        const slot = machine.slots[order.slotIndex];
        
        const data:IOrderPublic = {
            name:order.name,
            machineID:order.machineID,
            index:order.slotIndex,
            cost:order.cost,
            image:slot.thumbnail,
            info:slot.info
        }

        return res.status(200).json(data);
    })

    app.post("/orders/create", async (req,res)=>{
        const order:IOrder = {
            cost:req.body.cost,
            createDate:req.body.createDate,
            id:"",
            insertDate:0,
            location:req.body.location,
            machineID:req.body.machineID,
            name:req.body.name,
            slotIndex:req.body.slotIndex
        }

        const newOrder = await AddOrder(order);
        res.status(201).json(newOrder);
    });*/
}