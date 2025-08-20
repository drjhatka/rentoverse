"use server"
import {connect, connection} from "mongoose";

export async function connectToDB(){
    try {
        const connection = await connect(process.env.NEXT_MONGODB_URI!)
        //connection.on()
        console.log('Database is connected')
        //console.log( connection.then(()=>console.log(connection)))
        
    } catch (error) {
        throw new Error('Something went wrong while connecting to database. '+error)
    }
    finally{
        await connection.close()
    }
}