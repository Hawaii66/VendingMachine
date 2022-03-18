import express from "express";
import cors from "cors"
import { Routes } from "./Routes/Routes";
import { GetMachine,GetMachineLocations } from "./Database/Postgres/MachineSQL";
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

GetMachineLocations();
GetMachine("id123");

//Routes(app);

app.listen(PORT,()=>{
    console.log(`Listening on: http://localhost:${PORT}`);
});