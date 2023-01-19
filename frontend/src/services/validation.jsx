import { toast } from "react-toastify";

function nameValitation(name) {
     try {
          name = String(name).trim();
          if (name.length < 3 || name.length > 20) {
               toast.error("O nome deve ter entre 3 e 20 caracteres");
               return false;
          }

          return true;
     } catch (error) {
          toast.error("O nome deve ser uma string");
          return false;
     }
}


function descriptionValitation(description) {
     try {
          description = String(description).trim();
          if (description.length < 3 || description.length > 100) {
               toast.error("A descrição deve ter entre 3 e 100 caracteres");
               return false;
          }

          return true;

     } catch (error) {
          toast.error("A descrição deve ser uma string");
          return false;
     }
}

function priceValitation(price) {
     try {
          Number(price);
          if (price < 0) {
               toast.error("O preço não pode ser negativo");
               return false;
          }

          return true;

     } catch (error) {
          toast.error("O preço deve ser um número");
          return false;
     }
}


function validateCategory(category) {
     if (nameValitation(category.name) && descriptionValitation(category.description)) {
          return true;
     }

     return false;
}

function validateService(service) {
     if (nameValitation(service.name) && descriptionValitation(service.description) && priceValitation(service.price)) {
          return true;
     }

     return false;
}    


export { validateCategory, validateService };