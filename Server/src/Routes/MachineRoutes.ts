import {Express} from "express"
import { CreateMachine } from "../Database/MachinesDB";
import { Machine } from "../Interfaces/MachineInterface"
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
}