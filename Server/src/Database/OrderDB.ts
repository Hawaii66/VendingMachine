import { Order, RaspberryOrder } from "../Interfaces/Order"
import { raspOrders, doneOrders } from "./DatabaseAPI"

type GetAllOrdersType = () => Promise<RaspberryOrder[]>
type GetOrdersMachineType = (machineID:string) => Promise<RaspberryOrder[]>
type OrderExitsType = (id:string) => Promise<boolean>
type GetOrderType = (id:string) => Promise<RaspberryOrder|null>
type AddOrderType = (setting:Order) => Promise<RaspberryOrder>
type RemoveOrderType = (id:string) => Promise<RaspberryOrder>

export const GetAllOrders:GetAllOrdersType = async () => {
    const all:RaspberryOrder[] = await raspOrders.find();
    console.log(all);
    return all;
}

export const GetOrdersMachine:GetOrdersMachineType = async (id) => {
    const machineOrders:RaspberryOrder[] = await raspOrders.find({machineID:id});
    return machineOrders;
}

export const OrderExits:OrderExitsType = async (id) => {
    const order = GetOrder(id);
    return order === null;
}

export const GetOrder:GetOrderType = async (id) => {
    const order:RaspberryOrder = await raspOrders.findOne({id:id});
    return order;
}

export const AddOrder:AddOrderType = async (settings) => {
    const doneOrder:Order = {
        cost:settings.cost,
        id:await GetRandomOrderID("finalorder"),
        location:settings.location,
        machineID:settings.machineID,
        name:settings.name,
        slotIndex:settings.slotIndex,
        createDate:settings.createDate,
        insertDate:Date.now(),
    }

    const order:RaspberryOrder = {
        id:await GetRandomOrderID("rasporder"),
        machineID:settings.machineID,
        name:settings.name,
        slotIndex:settings.slotIndex,
        orderID:doneOrder.id
    }

    await doneOrders.insert(doneOrder);
    const newOrder = await raspOrders.insert(order);
    return newOrder;
}

export const RemoveOrder:RemoveOrderType = async (id) => {
    const del:RaspberryOrder = await raspOrders.findOneAndDelete({id:id});
    return del;
}

const GetRandomOrderID = async (str:string) => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    while(await OrderExits(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    }

    return randomID
}