import { IImage, ILocation } from "./MachineInterface";

export interface IRaspberryOrder
{
    id:string,
    machineID:string,
    slotID:string
}

export interface IOrder
{
    id:string,
    location:string,
    machineID:string,
    slotID:string,
    candyID:string,
    purchaseDate:number
}

export interface IOrderPublic
{
    name:string,
    machineID:string,
    cost:number,
    index:number,
    image:IImage,
    info:string
}