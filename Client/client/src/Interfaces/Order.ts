export interface IRaspberryOrder
{
    id:string,
    name:string,
    machineID:string,
    slotIndex:number,
    orderID:string
}

export interface IOrder
{
    id:string,
    name:string,
    cost:number,
    createDate:number,
    insertDate:number,
    machineID:string,
    slotIndex:number,
    location:Location
}