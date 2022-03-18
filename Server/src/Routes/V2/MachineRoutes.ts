import {Express} from "express";
import { ICandy } from "../../Interfaces/MachineInterface";
import { GetCandy, GetMachine, GetMachineLocations } from "../../Database/Postgres/MachineSQL";

export const MachineRoutes = (app:Express) => {
    app.get("/v2/machines/get/:id", async(req,res)=>{
        const id = req.params.id;

        const machine = await GetMachine(id);
        var candys:ICandy[] = [];
        if(machine === null){return res.status(400).send("No machine found with that ID");}
        for(var i = 0; i < machine.slots.length; i ++)
        {
            var candy = await GetCandy(machine.slots[i].candy);
            if(candy === null){continue;}

            candy.price = parseFloat(candy.price.toPrecision(5));
            candys.push(candy);
        }

        res.status(200).json({machine,candys});
    });

    app.get("/v2/machines/locations", async(req,res)=>{
        const locations = await GetMachineLocations();
        if(locations === null){return res.status(500).send("Error getting locations");}

        res.status(200).send(locations);
    });

    app.get("/v2/machines/candy")
}