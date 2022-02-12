import {Express} from "express"

export const Routes = (app:Express) => {
    app.get("/",(_,res)=>{
        res.status(200).send("Hello World")
    });
}