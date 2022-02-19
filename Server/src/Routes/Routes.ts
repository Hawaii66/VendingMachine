import {Express} from "express"
import { createPaymentRequest, GetClient, newTest } from "../Utils/Swish";
import { AdminRoutes } from "./AdminRoutes";
import { MachineRoutes } from "./MachineRoutes";
import { OrderRoutes } from "./OrderRoutes";
import { RaspRoutes } from "./RaspRoutes";


export const Routes = async (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).send("Hello World")
    });


    var client = await GetClient();
    //createPaymentRequest(client, 100, "Swish message")

    const paymentRequest = await createPaymentRequest(client, 100, 'Test Payment');
    console.log(paymentRequest)
    /*if (paymentRequest === undefined){
        console.log("ERROR§12");
        return;
    }
    const callbackUrl = `https://localhost:3000/receipt?ref=${paymentRequest.id}`;
    const appUrl = `swish://paymentrequest?token=${paymentRequest.token}&callbackurl=${callbackUrl}`;

    // Open or redirect the user to the url
    console.log(appUrl);*/

    AdminRoutes(app);
    MachineRoutes(app);
    OrderRoutes(app);
    RaspRoutes(app);
}