import { Request, Response } from "express";
import servicesModel from "../models/servicesModel";
import categoryModel from "../models/categoryModel";

export default new class HomeController {

     async index(req:Request, res:Response): Promise<Response | void> {
          const serviceCount = await servicesModel.count()
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

          const categoryCount = await categoryModel.count()
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

          let totalPrice = 0;
          await servicesModel.find()
          .then((services) => {
               services.forEach((service) => {
                    totalPrice += service.price;
               });
          }).catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          })

          return res.status(200).json({ serviceCount, categoryCount, totalPrice });
     }
}