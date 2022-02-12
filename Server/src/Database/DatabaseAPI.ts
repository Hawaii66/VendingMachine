import monk, {ICollection} from "monk";
require('dotenv').config()

if(process.env.MONGO_DB_URI === undefined){
    console.log("EXIT PROCESS NO MONGO_DB_URI AVAILABLE");
    process.exit()
}

export const db = monk(process.env.MONGO_DB_URI);
export const machines:ICollection = db.get("machines");