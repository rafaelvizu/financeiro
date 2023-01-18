import Category from "../models/categoryModel";
import { Request, Response } from "express";
import { ValidateCategory } from "./validateFieldsController";
import { Types } from "mongoose";
import ServicesModel from "../models/servicesModel";

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
          const dataValidated = await ValidateCategory.init(req.body);

          if (!dataValidated)
               return res.status(400).json({ message: "Invalid fields" });

          await Category.create(dataValidated)
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
          const { id } = req.body;

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          const dataValidated = await ValidateCategory.init(req.body, id);

          if (!dataValidated || !id)
               return res.status(400).json({ message: "Invalid fields" });
          
          await Category.findByIdAndUpdate({ _id: id }, dataValidated)
          .then(async (data) => {
               await ServicesModel.updateMany({ category: data.name }, { category: dataValidated.name } ); 
               console.log(await ServicesModel.find({ category: dataValidated.name }))      
               return res.status(200).json({ message: "Category updated" });
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

     public async deleteCategory(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.params;
          console.log(id)

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          Category.deleteOne({ _id: id })
          .then(() => {
               return res.status(200).json({ message: "Category deleted" });
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          })
     }

     public async getCategoryById(req:Request, res:Response): Promise<Response | void>
     {
          const { id } = req.params;

          if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

          await Category.findOne({ _id: id })
          .then((doc) => {
               if (!doc) return res.status(404).json({ message: "Category not found" });
               return res.status(200).json(doc);
          })
          .catch(err => {
               console.error(err);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }
}