/*import { IOrder, IRaspberryOrder } from "../Interfaces/Order"
import { raspOrders, doneOrders } from "./DatabaseAPI"

type GetAllOrdersType = () => Promise<IRaspberryOrder[]>
type GetOrdersMachineType = (machineID:string) => Promise<IRaspberryOrder[]>
type OrderExitsType = (id:string) => Promise<boolean>
type GetOrderType = (id:string) => Promise<IRaspberryOrder|null>
type GetFullOrderType = (id:string) => Promise<IOrder|null>;
type AddOrderType = (setting:IOrder) => Promise<IRaspberryOrder>
type RemoveOrderType = (id:string) => Promise<IRaspberryOrder>

export const GetAllOrders:GetAllOrdersType = async () => {
    const all:IRaspberryOrder[] = await raspOrders.find();
    console.log(all);
    return all;
}

export const GetOrdersMachine:GetOrdersMachineType = async (id) => {
    const machineOrders:IRaspberryOrder[] = await raspOrders.find({machineID:id});
    return machineOrders;
}

export const OrderExits:OrderExitsType = async (id) => {
    const order = GetOrder(id);
    return order === null;
}

export const GetOrder:GetOrderType = async (id) => {
    const order:IRaspberryOrder = await raspOrders.findOne({id:id});
    return order;
}

export const GetFullOrder:GetFullOrderType = async (id) => {
    const order:IOrder = await doneOrders.findOne({id:id});
    return order;
}

export const AddOrder:AddOrderType = async (settings) => {
    const doneOrder:IOrder = {
        cost:settings.cost,
        id:await GetRandomOrderID("finalorder"),
        location:settings.location,
        machineID:settings.machineID,
        name:settings.name,
        slotIndex:settings.slotIndex,
        createDate:settings.createDate,
        insertDate:Date.now(),
    }

    const order:IRaspberryOrder = {
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
    const del:IRaspberryOrder = await raspOrders.findOneAndDelete({id:id});
    return del;
}

const GetRandomOrderID = async (str:string) => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    while(await OrderExits(randomID)){
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + `:${str}`;
    }

    return randomID
}*/