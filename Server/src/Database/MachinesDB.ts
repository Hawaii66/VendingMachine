import { Location, Machine } from "../Interfaces/MachineInterface";
import { machines } from "./DatabaseAPI";

type GetAllType = () => Promise<Machine[]>
type GetIDType = (id:string) => Promise<Machine|null>
type GetLocationsType = () => Promise<Location[]>
type CreateMachineType = (machine:Machine) => Promise<Machine|null>
type IDExistsType = (id:string) => Promise<boolean>

export const GetAll:GetAllType = async () => {
    return await machines.find();
}

export const GetID:GetIDType = async (id) => {
    const machine:Machine = await machines.findOne({id:id});

    return machine;
}

export const IDExists:IDExistsType = async (id) => {
    const machine = await GetID(id);

    if(machine === null){return false;}
    return true;
}

export const GetLocations:GetLocationsType = async () => {
    const machines = await GetAll();
    var locs:Location[] = [];
    for(var i = 0; i < machines.length; i ++){
        locs.push(machines[i].location);
    }

    return locs;
}

export const CreateMachine:CreateMachineType = async (setting) => {
    const machine:Machine = {
        name:setting.name,
        id:await GenerateMachineID(),
        location:setting.location,
        slots:[]
    }

    const newMachine:Machine = await machines.insert(machine);
    return newMachine;
}

const GenerateMachineID = async () => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":machine";
    while(await IDExists(randomID)){
        console.log(randomID);
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":machine";
    }

    return randomID
}