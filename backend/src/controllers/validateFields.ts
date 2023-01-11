import Joi from 'joi';
import Category from '../models/category';

class ValidateService
{

     static validateName(name:string) : string | boolean
     {
          const schema = Joi.object({
               name: Joi.string().min(3).max(50).required()
          });

          const valid = schema.validate({ name });
          if (valid.error) return false;

          return valid.value.name;
     }

     static validateDescription(description:string) : string | boolean
     {
          const schema = Joi.object({
               description: Joi.string().min(3).max(100).required()
          });

          const valid = schema.validate({ description });
          console.log(valid)
          if (valid.error) return false;

          return valid.value.description;
     }

     static validatePrice(price: number) : number | boolean
     {
          const schema = Joi.object({
               price: Joi.number().min(0).required()
          });

               let valid = schema.validate({ price });
               
               if (valid.error) return false;
               return valid.value.price;

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

          const valid = schema.validate({ name });

          if (valid.error) return false;

          const data = await Category.findOne({name: valid.value.name});

          if (data) {
               return false;
          } else {
               return name;
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