import Joi from 'joi';
import Category from '../models/categoryModel';

class ValidateService
{
     
     static async validateCategory(category:string)
     {
          const data = await Category.findOne({name: category});
          if (data) return category

          return false;
     }

     static async init({ name, description, price, category } : { name:string, description:string, price:number, category:string }) 
     {
          const valid = Joi.object({
               name: Joi.string().trim().min(3).max(20).required(),
               description: Joi.string().trim().min(3).max(100).required(),
               price: Joi.number().min(0).required(),
          }).validate({ name, description, price });

          if (valid.error) return false;

          if (!await this.validateCategory(category)) return false;

          valid.value.category = category;
          valid.value.createAt = new Date();

          return valid.value;
     }
}

class ValidateCategory
{
     static async init({ name, description, category } : { name:string, description:string, category:string })
     {

          const valid = Joi.object({
               name: Joi.string().trim().min(3).max(20).required(),
               description: Joi.string().trim().min(3).max(100).required(),
          }).validate({ name, description });

          if (valid.error) return false;
          if (await ValidateService.validateCategory(category)) return false;

          valid.value.category = category;
          return valid.value;
     }
}


export { ValidateService, ValidateCategory };