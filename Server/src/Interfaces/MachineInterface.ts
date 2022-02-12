export interface Machine
{
    name:string,
    id:string,
    slots:Slot[],
    location:Location
}

export interface Location
{
    name:string,
    lat:number,
    lng:number
}

export interface Slot
{
    x:number,
    y:number,
    cost:number,
    amount:number,
    thumbnail:Image,
    imgs:Image[],
}

export interface Image
{
    url:string,
    alt:string
}