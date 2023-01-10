import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";


export default function addService() {
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState(0);
     const [category, setCategory] = useState("");
     const [loadCategory, setLoadCategory] = useState([]);
     const [index, setIndex] = useState(-1);

     useEffect(() => {
          getApi();
          return;
     }, []);

     useEffect(() => {
          setTimeout(async () => {
               await getApi();
               return;
          }, 60000)
     });

     async function getApi() {
          await api.get("/category").then((response) => {
               if (response.data == loadCategory) return;

               setLoadCategory(response.data);
               setNameCategory(response.data);


               return;
          });
     }

     function setNameCategory(data) {
          if (data.length == 0) return;

          setCategory(data[0].name);
          setIndex(0)

          return;
     }

     function validaeData() {
          if (name == "" || description == "") {
               toast.error("Preencha todos os campos");
               return false;
          }

          if (!category) {
               toast.error("Adicione uma nova categoria");
               return;
          }

          if (name.length < 3 || name.length > 50) {
               toast.error("Nome deve ter entre 3 e 50 caracteres");
               return false;
          }

          if (description.length < 3 || description.length > 100) {
               toast.error("Descrição deve ter entre 3 e 100 caracteres");
               return false;
          }

          if (price < 0) {
               toast.error("Preço deve ser maior ou igual a 0");
               return false;
          }

          return true;
     }

     function saveData() {
          console.log(category)
          if (!validaeData()) return;
          else {
               api.post("/services/add", {
                    name,
                    description,
                    price,
                    category
               })
               .then(() => {
                    toast.success("Serviço adicionado com sucesso");
                    setName("");
                    setDescription("");
                    setPrice("");
                    return;
               })
               .catch((err) => {
                    console.error(err)
                    toast.error("Erro ao adicionar serviço");
                    return;
               });
               
          }
     }

     return (
          <main>
               <h1>Adicionar Serviço</h1>

               <div>
                    <div>
                         <label htmlFor="name">Nome</label>
                         <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                         <label htmlFor="description">Descrição</label>
                         <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                         <label htmlFor="price">Preço</label>
                         <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min="0"/>
                    </div>

                    <div>
                         <label htmlFor="category">Categoria</label>
                         <select name="category" id="category" value={index!==-1?index:'não há categórias'} onChange={(e) => {
                              setIndex(e.target.value);
                              setCategory(loadCategory[e.target.value].name);
                         }}>
                              {

                                   loadCategory.map((load, index) => {
                                        return (
                                             <option value={index} key={load._id}>{load.name}</option>
                                        )
                                   })
                              }

                         </select>
                    </div>

                    <button onClick={() => saveData()}>Adicionar</button>
               </div>

          </main>
     )
}