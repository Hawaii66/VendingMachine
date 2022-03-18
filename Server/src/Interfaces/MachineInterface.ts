export interface IMachine
{
    name:string,
    id:string,
    slots:ISlot[],
    location:ILocation
}

export interface ILocation
{
    machineID:string,
    name:string,
    lat:number,
    lng:number
}

export interface ISlot
{
    id:string,
    x:number,
    y:number,
    amount:number,
    candy:string
}

export interface ICandy
{
    id:string,
    name:string,
    info:string,
    price:number,
    img:string
}

export interface IImage
{
    url:string,
    alt:string
}