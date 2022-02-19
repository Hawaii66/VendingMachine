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
    name:string,
    info:string,
    x:number,
    y:number,
    grid:{
        x:number,
        y:number
    },
    cost:number,
    amount:number,
    thumbnail:IImage,
    imgs:IImage[],
}

export interface IImage
{
    url:string,
    alt:string
}