import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

export default function AddCategory() {
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");

     function validadeData(nameF='', descriptionF='')
     {

          nameF = nameF.trim();
          descriptionF = descriptionF.trim();

          if (nameF.length < 3 || nameF.length > 20) {
               toast.error("Nome inválido");
               return false;
          }

          if (descriptionF.length < 3 || descriptionF.length > 100) {
               toast.error("Descrição inválida");
               return false;
          }

          return true;
     }

     
     async function saveData() {
          if (!validadeData(name, description)) {
               setName(name.trim());
               setDescription(description.trim());
               return;
          }

          const response = await api.post("/category/add", {
               name,
               description
          });

          if (response.status == 200) {
               toast.success("Categoria adicionada com sucesso");
               setName("");
               setDescription("");
          } else toast.error("Erro interno ao adicionar categoria");


          return;
     }
 
     return (
          <main>
               <h1>Adicionar Categoria</h1>

               <div>
                    <div>
                         <label htmlFor="name">Nome</label>
                         <input id="name" name="name" type="text" placeholder="Nome da categoria" minLength="3" maxLength="20" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>

                    <div>
                         <label htmlFor="description">Descrição</label>
                         <textarea name="description" id="description" cols="30" rows="10" maxLength="100" minLength="3" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <button onClick={() => {
                         saveData();
                    }}>Adicionar</button>
               </div>
          </main>
    )
}    