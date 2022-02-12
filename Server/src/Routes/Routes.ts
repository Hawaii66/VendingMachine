import {Express} from "express"
import { AdminRoutes } from "./AdminRoutes";
import { MachineRoutes } from "./MachineRoutes";
import { OrderRoutes } from "./OrderRoutes";

export const Routes = (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).send("Hello World")
    });

    AdminRoutes(app);
    MachineRoutes(app);
    OrderRoutes(app);
}