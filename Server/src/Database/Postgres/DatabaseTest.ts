import { Client } from 'pg'
require('dotenv').config()

const client = new Client(process.env.POSTGRESSSQL_KEY)

const execute = async () => {
    try{
        await client.connect()
        const res = await client.query("SELECT m.id,m.name,s.x from machines m JOIN slots s ON m.slots[1]=s.id LIMIT 1")
        console.log(res);
    }
    catch(ex){
        console.log(ex)
    }
    finally {
        await client.end()
    }

}

execute()