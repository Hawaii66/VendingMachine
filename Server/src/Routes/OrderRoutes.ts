import {Express} from "express"
import { Order } from "../Interfaces/Order";
import { AddOrder, GetAllOrders } from "../Database/OrderDB";
import { AuthToken } from "../Utils/Middelware"

export const OrderRoutes = (app:Express) => {
    app.get("/orders",AuthToken, async (req,res)=>{
        const orders = await GetAllOrders();
        res.status(200).json(orders);
    });

    app.post("/orders/create", async (req,res)=>{
        const order:Order = {
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
    });
}