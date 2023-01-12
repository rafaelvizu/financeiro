import { Response, Request } from "express";
import Services from "../models/servicesModel";
import { ValidateService } from "./validateFieldsController";
import { Types } from "mongoose";

export default new class Controllers
{

     constructor()
     {
          this.addService = this.addService.bind(this);
          this.getServices = this.getServices.bind(this);
          this.updateService = this.updateService.bind(this);
     }
     
     public async getServices(req:Request, res:Response): Promise<Response | void>
     {
          await Services.find()
          .then((services) => {
               return res.status(200).json(services);
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }

     public async addService(req:Request, res:Response): Promise<Response | void>
     {   
          const dataValidated = await ValidateService.init(req.body);

          if (!dataValidated) {
               return res.status(400).json({ message: "Invalid Fields" });
          }    

          await Services.create(dataValidated)
          .then(() => {
               return res.status(200).json({ message: "Service Created"});
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

     public async updateService(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.body;

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          const dataValidated = await ValidateService.init(req.body);
          if (!dataValidated || !id)
               return res.status(400).json({ message: "Invalid Fields" });

          delete dataValidated.createAt;    

          await Services.updateOne(dataValidated)
          .then(() => {
               return res.status(200).json({ message: "Service Updated" });
          })
          .catch(() => {
               return res.status(500).json({ message: "Internal Server Error" });    
          });
     }

     public async deleteService(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.body;

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          Services.deleteOne({ _id: id })
          .then(() => {
               return res.status(200).json({ message: "Service Deleted" });
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }

     public async getServiceById(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.params;

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          await Services.findOne({ _id: id })
          .then((doc) => {
               if (!doc) return res.status(404).json({ message: "Service Not Found" });
               
               return res.status(200).json(doc);
          })
          .catch(() => {
               return res.status(500).json({ message: "Internal Server Error" });
          })
     }


}