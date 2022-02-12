import { Location, Machine, Slot } from "../Interfaces/MachineInterface";
import { machines } from "./DatabaseAPI";

type GetAllType = () => Promise<Machine[]>;
type GetIDType = (id:string) => Promise<Machine|null>;
type GetLocationsType = () => Promise<Location[]>;
type CreateMachineType = (machine:Machine) => Promise<Machine|null>;
type IDExistsType = (id:string) => Promise<boolean>;
type FillSlotType = (id:string, slotIndex:number, amount:number) => Promise<Machine|null>;
type SetMachineType = (id:string, machine:Machine) => Promise<Machine|null>;
type ChangeSlotType = (id:string, slotIndex:number, slot:Slot) => Promise<Machine|null>;
type RemoveSlotType = (id:string, slotIndex:number) => Promise<Machine|null>;
type InsertSlotType = (id:string, slot:Slot) => Promise<Machine|null>;
type ConsumeSlotType = (id:string, slotIndex:number) => Promise<Machine|null>;
type CanConsumeType = (id:string, slotIndex:number) => Promise<boolean>;

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

export const SetMachine:SetMachineType = async (id, machine) => {
    const newMachine = await machines.findOneAndUpdate({id:id},{$set:machine});
    return newMachine;
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

export const FillSlot:FillSlotType = async (id, slotIndex, amount) => {
    var machine = await GetID(id);
    if(machine === null){return null;}

    if(machine.slots.length < slotIndex){return null;}

    var slot = machine.slots[slotIndex];
    slot.amount = amount;

    machine.slots[slotIndex] = slot;

    return await SetMachine(id, machine);
}

export const CanConsume:CanConsumeType = async (id, slotIndex) => {
    var machine = await GetID(id);
    if(machine === null){return false;}

    if(machine.slots.length < slotIndex){return false;}

    return machine.slots[slotIndex].amount > 0;
}

export const ConsumeSlot:ConsumeSlotType = async (id, slotIndex) => {
    var machine = await GetID(id);
    if(machine === null){return null;}

    if(machine.slots.length < slotIndex){return null;}

    machine.slots[slotIndex].amount -= 1;

    return await SetMachine(id, machine);
}

export const ChangeSlot:ChangeSlotType = async (id, slotIndex, slot) => {
    var machine = await GetID(id);
    if(machine === null){return null;}

    if(machine.slots.length < slotIndex){return null;}

    machine.slots[slotIndex] = slot;

    return await SetMachine(id, machine);
}

export const RemoveSlot:RemoveSlotType = async (id, slotIndex) => {
    var machine = await GetID(id);
    if(machine === null){return null;}

    if(machine.slots.length < slotIndex){return null;}

    machine.slots.splice(slotIndex, 1);

    return await SetMachine(id, machine);
}

export const InsertSlot:InsertSlotType = async (id, slot) => {
    var machine = await GetID(id);
    if(machine === null){return null;}

    machine.slots.push(slot);

    return await SetMachine(id, machine);
}

const GenerateMachineID = async () => {
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":machine";
    while(await IDExists(randomID)){
        console.log(randomID);
        randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":machine";
    }

    return randomID
}