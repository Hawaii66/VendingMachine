import {Express} from "express"
import { ChangeSlot, CreateMachine, GetAll, GetID, InsertSlot, SetMachine } from "../Database/MachinesDB";
import { Machine, Slot } from "../Interfaces/MachineInterface"
import { AuthToken } from "../Utils/Middelware";

export const MachineRoutes = (app:Express) => {
    app.post("/machines/create", AuthToken, async (req,res)=>{
        const settings:Machine = {
            id:"",
            name:req.body.name,
            location:req.body.location,
            slots:[]
        }

        const machine = await CreateMachine(settings); 
        res.status(200).json(machine);
    });
    
    app.post("/machines/insert", AuthToken, async (req,res)=> {
        const id = req.body.id;
        const slot:Slot = {
            amount:0,
            cost:req.body.cost,
            imgs:req.body.imgs,
            thumbnail:req.body.thumbnail,
            x:req.body.x,
            y:req.body.y,
            name:req.body.name,
            info:req.body.info
        }

        const machine = await InsertSlot(id, slot);
        res.status(200).json(machine);
    });

    app.post("/machines/set", AuthToken, async (req,res)=>{
        const id = req.body.id;
        const index = req.body.index;
        const slot:Slot = {
            amount:0,
            cost:req.body.cost,
            imgs:req.body.imgs,
            thumbnail:req.body.thumbnail,
            x:req.body.x,
            y:req.body.y,
            name:req.body.name,
            info:req.body.info
        }

        const machine = await ChangeSlot(id,index, slot);
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
}