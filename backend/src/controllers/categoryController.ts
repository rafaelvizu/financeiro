import Category from "../models/category";
import { Request, Response } from "express";
import { ValidateCategory } from "./validateFields";

export default new class categoryController
{
     constructor()
     {
          this.addCategory = this.addCategory.bind(this);
          this.getCategories = this.getCategories.bind(this);
          this.updateCategory = this.updateCategory.bind(this);
     }

     public async getCategories(req:Request, res:Response): Promise<Response | void>
     {
          await Category.find()
          .then((categories) => {
               return res.status(200).json(categories);
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }

     public async addCategory(req:Request, res:Response): Promise<Response | void>
     {
          const { name, description } = req.body; 

          const dataValidated = await ValidateCategory.initDefault(name, description);

          if (!dataValidated)
               return res.status(400).json({ message: "Invalid fields" });

          await Category.create({ name, description })
          .then(() => {
               return res.status(200).json({ message: "Category created" });
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

     public async updateCategory(req:Request, res:Response): Promise<Response | void>
     {
          const { id, name, description } = req.body;
          const dataValidated = await ValidateCategory.initDefault(name, description);

          if (!dataValidated || !id)
               return res.status(400).json({ message: "Invalid fields" });

          await Category.updateOne({ _id: id }, {
               name: dataValidated.name,
               description: dataValidated.description
          })
          .then(() => {
               return res.status(200).json({ message: "Category updated" });
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

     public async deleteCategory(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.body;

          Category.deleteOne({ _id: id })
          .then(() => {
               return res.status(200).json({ message: "Category deleted" });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          })
     }


}