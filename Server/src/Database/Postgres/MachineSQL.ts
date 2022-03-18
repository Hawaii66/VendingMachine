import { Pool } from "pg";
import { ICandy, ILocation, IMachine, ISlot } from "../../Interfaces/MachineInterface";
require('dotenv').config()

type IGetMachine = (id:string) => Promise<IMachine|null>;
type IGetSlot = (id:string) => Promise<ISlot|null>;
type IGetCandy = (id:string) => Promise<ICandy|null>;
type IGetLocation = (id:string) => Promise<ILocation|null>;
type IGetMachineLocations = () => Promise<ILocation[]|null>;

const pool = new Pool({
    connectionString:process.env.POSTGRESSSQL_KEY
});

export const GetSlot:IGetSlot = async(id) => {
    const sql = `
        SELECT * FROM slots WHERE id=$1
    `;
    const variables = [id];
    const client = await pool.connect();
    var res = await client.query(sql, variables);
    client.release();
    if(res.rows[0] === undefined){return null;}
    
    return res.rows[0];
}

export const GetLocation:IGetLocation = async(id) => {
    const sql = `
        SELECT * FROM locations WHERE id=$1
    `;
    const variables = [id]
    const client = await pool.connect();
    var res = await client.query(sql, variables);
    client.release();
    if(res.rows[0] === undefined){return null;}
    return res.rows[0];
}

export const GetCandy:IGetCandy = async(id) => {
    const sql = `
        SELECT * FROM candys WHERE id=$1
    `;
    const variables = [id];
    const client = await pool.connect();
    var res = await client.query(sql,variables);
    client.release();
    if(res.rows[0] === undefined){return null;}

    res.rows[0].price = parseFloat(res.rows[0].price);

    return res.rows[0];
}

export const GetMachineLocations:IGetMachineLocations = async() => {
    var sql = `
        SELECT m.id machineid, l.* FROM machines m JOIN locations l ON m.location=l.id
    `;
    const client = await pool.connect();
    const {rows} = await client.query(sql);
    client.release();

    const location:ILocation = {
        lat:rows[0].lat,
        lng:rows[0].lng,
        machineID:rows[0].machineid,
        name:rows[0].name
    }

    return [location];
}

export const GetMachine:IGetMachine = async(id) => {
    var sql = `
        SELECT * FROM machines m WHERE id=$1
        `;
    var variables:any = [id];
    const client = await pool.connect();
    const {rows} = await client.query(sql, variables);
    client.release();
    
    if(rows === undefined || rows.length === 0 ||rows[0] === undefined){return null;}
    
    const location = await GetLocation(rows[0].location);
    if(location === null){return null;}

    var machine:IMachine = {
        id:rows[0].id,
        name:rows[0].name,
        location:location,
        slots:[]
    }

    const slotIDS:string[] = rows[0].slots;
    for(var i = 0; i < slotIDS.length; i ++){
        const slot = await GetSlot(slotIDS[i]);
        if(slot === null){continue;}
        machine.slots.push(slot);
    }

    return machine;
}