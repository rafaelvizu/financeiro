import mongoose from "mongoose";
import 'dotenv/config';

export default class MongoDB {
     static async Connect()
     {
          await mongoose.connect(process.env.DB_URL || "")
     }

     static async Disconnect()
     {
          mongoose.disconnect();
     }

     static createModel(name:string, schema:mongoose.Schema)
     {
          return mongoose.model(name, new mongoose.Schema(schema));
     }

     static async DropDatabase()
     {
          await mongoose.connection.dropDatabase();
     }
}