import Joi from 'joi';
import Category from '../models/category';

class ValidateService
{

     static validateName(name:string) : string | boolean
     {
          const schema = Joi.object({
               name: Joi.string().trim().min(3).max(50).required()
          });

          try {
               schema.validate({ name });
               name = name.trim();
               return name;
          }
          catch {
               return false;
          }
          
     }

     static validateDescription(description:string) : string | boolean
     {
          const schema = Joi.object({
               description: Joi.string().trim().min(3).max(100).required()
          });

          try {
               schema.validate({ description });
               description = description.trim();
               return description;
          }
          catch {
               return false;
          }
     }

     static validatePrice(price: number) : number | boolean
     {
          const schema = Joi.object({
               price: Joi.number().min(0).required()
          });

          try {
               price = Number(price);
               schema.validate({ price });
               return price;
          }
          catch {
               return false;
          }
     }

     static async validateCategory(category:string)
     {
          const data = await Category.findOne({name: category});
          if (data) return category

          return false;
     }

     static async initDefault(name:string, description:string, price:number, category:string)
     {

          const nameValidated = this.validateName(name);
          if (!nameValidated) return false;


          const descriptionValidated = this.validateDescription(description);
          if (!descriptionValidated) return false;


          const priceValidated = this.validatePrice(price);
          if (priceValidated === false) return false;


          const categoryValidated = await this.validateCategory(category);
          if (!categoryValidated) return false;

          
          return {
               name: nameValidated,
               description: descriptionValidated,
               price: priceValidated,
               category: categoryValidated
          }
     }
}

class ValidateCategory
{
     
     static async validateName(name:string) : Promise<string | boolean>
     {
          const schema = Joi.object({
               name: Joi.string().trim().min(3).max(20).required()
          });

          try {
               schema.validate({ name });
               name = name.trim();

               const data = await Category.findOne({name});

               if (data) {
                    return false;
               } else {
                    return name;
               }
          }
          catch {
               return false;
          }
     }

     static validateDescription(description:string) : string | boolean
     {
          return ValidateService.validateDescription(description);
     }

     static async initDefault(name:string, description:string)
     {
          const nameValidated = await this.validateName(name);
          if (!nameValidated) return false;

          const descriptionValidated = this.validateDescription(description);
          if (!descriptionValidated) return false;

          return {
               name: nameValidated,
               description: descriptionValidated
          }
     }

}


export { ValidateService, ValidateCategory };