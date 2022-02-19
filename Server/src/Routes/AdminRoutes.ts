import {Express} from "express"
import { GetID } from "../Database/MachinesDB";
import { AuthToken } from "../Utils/Middelware"

export const AdminRoutes = (app:Express) => {
    app.get("/admin/status",AuthToken, (req,res) => {
        res.status(200).send("Done");
    });

    app.get("/admin/test", AuthToken, (req,res)=>{
        GetID("213");
        res.send("OK");
    });
}