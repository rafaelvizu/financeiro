import { Response, Request } from "express";
import Services from "../models/services";

export default new class Controllers
{

     constructor()
     {
          this.validadeFields = this.validadeFields.bind(this);
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
          const { name, description, price } = req.body;

          try {
               if (!this.validadeFields(name, description, price)) {
                    return res.status(400).json({ message: "Invalid Fields" });

               } else {
                    await Services.create({
                         name,
                         description,
                         price,
                         createAt: new Date()
                    })
                    .then(() => {
                         return res.status(201).json({ message: "Service Created" });
                    })
                    .catch(err => {
                         console.error(err);
                         return res.status(500).json({ message: "Internal Server Error" });
                    });
               }
          }
          catch (err) {
               console.error(err);
               return res.status(400).json({ message: "Invalid Fields" });
          }
     }

     public async updateService(req:Request, res:Response): Promise<Response | void>
     {
          const {id, name, description, price } = req.body;

          try {
               if (!this.validadeFields(name, description, price) || !id)
                    return res.status(400).json({ message: "Invalid Fields" });

               await Services.updateOne({
                    _id: id,
                    name,
                    description,
                    price,
               })
               .then(() => {
                    return res.status(200).json({ message: "Service Updated" });
               })
               .catch(() => {
                    return res.status(500).json({ message: "Internal Server Error" });    
               });

          }
          catch (err) {
               return res.status(400).json({ message: "Invalid Fields" });
          }
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

     private validadeFields(name:string, description:string, price:number): boolean
     {
          if(!name || !description || !price)
               return false;

          if (name.length < 3 || name.length > 50)
               return false;

          if (description.length < 3 || description.length > 100)
               return false;

          if (price < 0)
               return false;


          return true;
     }
}