import {Express} from "express"
import { ChangeSlot, CreateMachine, FillSlot, GetAll, GetID, GetLocations, InsertSlot, RemoveSlot, SetMachine } from "../Database/MachinesDB";
import { IMachine, ISlot } from "../Interfaces/MachineInterface"
import { AuthToken } from "../Utils/Middelware";

export const MachineRoutes = (app:Express) => {
    app.post("/machines/create", AuthToken, async (req,res)=>{
        const settings:IMachine = {
            id:"",
            name:req.body.name,
            location:req.body.location,
            slots:[]
        }

        const machine = await CreateMachine(settings); 
        res.status(200).json(machine);
    });
    
    /*app.post("/machines/insert", AuthToken, async (req,res)=> {
        const id = req.body.id;
        const oldMachine = await GetID(id);
        if(oldMachine === null){return res.status(500).send("Error getting machine");}

        const slot:ISlot = {
            amount:0,
            cost:req.body.cost,
            index:oldMachine.slots.length,
            imgs:req.body.imgs,
            thumbnail:req.body.thumbnail,
            x:req.body.x,
            y:req.body.y,
            grid:{
                x:req.body.gridX,
                y:req.body.gridY
            },
            name:req.body.name,
            info:req.body.info
        }

        const machine = await InsertSlot(id, slot);
        res.status(200).json(machine);
    });

    /*app.post("/machines/set", AuthToken, async (req,res)=>{
        const id = req.body.id;
        const index = req.body.index;
        const slot:ISlot = {
            amount:0,
            index:index,
            cost:req.body.cost,
            imgs:req.body.imgs,
            thumbnail:req.body.thumbnail,
            x:req.body.x,
            y:req.body.y,
            grid:{
                x:req.body.gridX,
                y:req.body.gridY
            },
            name:req.body.name,
            info:req.body.info
        }

        const machine = await ChangeSlot(id,index, slot);
        res.status(200).json(machine);
    });*/

    app.post("/machines/fill", AuthToken, async (req,res)=>{
        const id = req.body.id;
        const slotIndex = req.body.index;
        const amount = req.body.amount;
        const machine = await FillSlot(id, slotIndex, amount);
        res.status(200).json(machine);
    });

    app.delete("/machines/delete", AuthToken, async (req,res)=>{
        const id = req.body.id;
        const slotIndex = req.body.index;
        const machine = await RemoveSlot(id, slotIndex);
        res.status(200).json(machine);
    });

    app.get("/machines/get/:id", async (req,res)=>{
        const id = req.params.id;
        const machine = await GetID(id);

        res.status(200).json(machine);
    });

    app.get("/machines", async (req,res)=>{
        const machines = await GetAll();
        res.status(200).json(machines);
    });

    app.get("/machines/locations", async (req,res)=>{
        const locations = await GetLocations();

        res.status(200).json(locations);
    });
}