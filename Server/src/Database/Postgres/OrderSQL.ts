import { Pool } from "pg";
import { IOrder, IRaspberryOrder } from "../../Interfaces/Order";
import { ICandy, ILocation, IMachine, ISlot } from "../../Interfaces/MachineInterface";
require('dotenv').config()

type IGetOrder = (id:string) => Promise<IOrder|null>;
type IAddOrder = (order:IOrder) => Promise<IOrder>;
type IAddRaspOrder = (order:IOrder) => Promise<IRaspberryOrder|null>;
type IRemoveRaspOrder = (id:string) => Promise<void>;
type IGetOrderMachine = (id:string) => Promise<IRaspberryOrder[]|null>;

const pool = new Pool({
    connectionString:process.env.POSTGRESSSQL_KEY
});

export const GetOrder:IGetOrder = async(id) => {
    const sql = `
        SELECT * FROM orders WHERE id=$1
    `;
    const variables = [id];
    const client = await pool.connect();
    const res = await client.query(sql,variables);
    client.release();

    const order:IOrder = {
        id:res.rows[0].id,
        candyID:res.rows[0].candy,
        location:res.rows[0].location,
        machineID:res.rows[0].machine,
        purchaseDate:res.rows[0].purchasedate,
        slotID:res.rows[0].slot
    }

    return order;
}

export const AddOrder:IAddOrder = async(order) => {
    const sql = `
        INSERT INTO orders(id,location,machine,slot,candy,purchasedate) VALUES($1,$2,$3,$4,$5,$6)
    `
    order.id = await RandomOrderID("order");

    const variables = [
        order.id,
        order.location,
        order.machineID,
        order.slotID,
        order.candyID,
        order.purchaseDate
    ]

    const client = await pool.connect();
    await client.query(sql,variables);
    const res = await client.query("SELECT * FROM orders WHERE id=$1",[order.id]);

    client.release();
    const o:IOrder = {
        id:res.rows[0].id,
        candyID:res.rows[0].candy,
        location:res.rows[0].location,
        machineID:res.rows[0].machine,
        purchaseDate:res.rows[0].purchasedate,
        slotID:res.rows[0].slot
    };
    return o;
}

export const AddRaspOrder:IAddRaspOrder = async(order) => {
    const randID = await RandomOrderID("rasporder");

    const sql = `
        INSERT INTO rasporders(id,machine,slot) VALUES($1,$2,$3)
    `
    console.log(order);
    const variables = [randID, order.machineID, order.slotID];
    console.log(variables);
    const client = await pool.connect();
    const res = await client.query(sql, variables);
    client.release();

    return res.rows[0];
}

export const RemoveRaspOrder:IRemoveRaspOrder = async(id) => {
    const sql = `
        DELETE FROM rasporders WHERE id=$1
    `;
    const variables = [id];
    const client = await pool.connect();
    await client.query(sql,variables);
    client.release();
}

export const GetOrdersMachine:IGetOrderMachine = async(id) => {
    const sql = `
        SELECT * FROM rasporders r WHERE machine=$1
    `;
    const variables = [id];

    const client = await pool.connect();
    const res = await client.query(sql,variables);
    client.release();

    const orders:IRaspberryOrder[] = [];
    for(var i = 0; i < res.rows.length; i ++){
        const order:IRaspberryOrder = {
            id:res.rows[i].id,
            machineID:res.rows[i].machine,
            slotID:res.rows[i].slot
        }
        orders.push(order);
    }

    return orders;
}

const RandomOrderID = async (i:string) => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":" + i;/*
    while(await IDExists(randomID)){
        console.log(randomID);
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":machine";
    }
*/

    return randomID
}