import mongoose from "mongoose";
import "dotenv/config";

class Database {
     private DB_URL: string;
     private status: boolean;

     constructor(DB_URL: string) 
     {
          this.DB_URL = DB_URL;
          this.status = false;
     }

     async connect()
     {
          await mongoose.connect(this.DB_URL)
          .then(() => {
               console.log("Database connected");
               this.status = true;
               return this.status;
          })
          .catch((err) => {
               console.error(err);
               return false;
          });
     }

     async disconnect()
     {
          await mongoose.disconnect()
          .then(() => {
               console.log("Database disconnected");
               this.status = false;
               return this.status;
          })
          .catch(err => {
               console.error(err);
               return false;
          });
     }

     getStatus(): boolean
     {
          return this.status;
     }

     creteModel(name: string, structSchema: object): mongoose.Model<any>
     {
          return mongoose.model(name, new mongoose.Schema(structSchema));
     }
}

export default new Database(process.env.DB_URL || '');
