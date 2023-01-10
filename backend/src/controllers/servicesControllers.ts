import { Response, Request } from "express";
import Services from "../models/services";
import { ValidateService } from "./validateFields";


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
          const { name, description, price, category } = req.body;

          const dataValidated = await ValidateService.initDefault(name, description, price, category);

          if (!dataValidated) {
               return res.status(400).json({ message: "Invalid Fields" });
          }    

          await Services.create({
               name: dataValidated.name,
               description: dataValidated.description,
               price: dataValidated.price,
               category: dataValidated.category,
               createAt: new Date()
          })
          .then(() => {
               return res.status(200).json({ message: "Service Created" });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });
 

     }

     public async updateService(req:Request, res:Response): Promise<Response | void>
     {
          const {id, name, description, price, category} = req.body;

          const dataValidated = await ValidateService.initDefault(name, description, price, category);

          if (!dataValidated || !id)
               return res.status(400).json({ message: "Invalid Fields" });


          await Services.updateOne({
               _id: id,
               name: dataValidated.name,
               description: dataValidated.description,
               price: dataValidated.price,
               category: dataValidated.category
          })
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