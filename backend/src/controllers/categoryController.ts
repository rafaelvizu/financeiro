import Category from "../models/category";
import { Request, Response } from "express";

export default new class categoryController
{
     constructor()
     {
          this.validadeFields = this.validadeFields.bind(this);
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

          try
          {
               if (!await this.validadeFields(name, description))
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
          catch {
               return res.status(400).json({ message: "Invalid Fields" });
          }
     }

     public async updateCategory(req:Request, res:Response): Promise<Response | void>
     {
          const { id, name, description } = req.body;

          try {
               if (!this.validadeFields(name, description) || !id)
                    return res.status(400).json({ message: "Invalid fields" });

               await Category.updateOne({ _id: id })
               .then(() => {
                    return res.status(200).json({ message: "Category updated" });
               })
               .catch((err) => {
                    console.error(err);
                    return res.status(500).json({ message: "Internal Server Error" });
               });
          }
          catch {
               return res.status(400).json({ message: "Invalid Fields" });
          }
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

     private async validadeFields(name:string, description:string): Promise<boolean | void>
     {
          
          if (!name || !description) 
               return false;
          
          if (name.length < 3 || name.length > 20)
               return false;
     
          if (description.length < 3 || description.length > 100)
               return false;

          if (await Category.findOne({ name }))
               return false;

          return true;
     }
}