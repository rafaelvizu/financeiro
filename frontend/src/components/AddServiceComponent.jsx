import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import ModalComponent from "./ModalComponent";
import { validateService } from '../services/validation';

export default function AddServiceComponent(props) {
     const [category, setCategory] = useState([]); 
     const [myCategory, setMyCategory] = useState("");
     const [myName, setMyName] = useState("");
     const [myPrice, setMyPrice] = useState(0);
     const [myDescription, setMyDescription] = useState("");
     const [editMode, setEditMode] = useState(false);
     const [myId, setMyId] = useState("");

     useEffect(() => {
          loadCategory();
          if (props.editData) {
               setEditMode(true);
               myId(props.editData._id);
               setMyName(props.editData.name);
               setMyPrice(props.editData.price);
               setMyDescription(props.editData.description);
               setMyCategory(props.editData.category);
               if (myCategory in category.name) {
                    setMyCategory(myCategory);
               }
          }

     }, [])

     async function clickButton() {
          const service = {
               name: myName,
               description: myDescription,
               price: myPrice,
               category: myCategory,
          };

          if (!validateService(service)) return;
               
          if (myId) {
               category.id = myId;

               await api.put(`/services/update`, service).then((response) => {
                    if (response.status === 200) {
                         toast.success("Categoria editada com sucesso");
                         props.reload();
                         return;
                    }

                    toast.error("Erro ao editar categoria");
               }).catch(() => {
                    toast.error("Erro ao editar categoria");
               });

               return;
          }

          await api.post(`/services/add`, service)
          .then((response) => {
               if (response.status === 200) {
                    toast.success("Categoria adicionada com sucesso");
                    setMyDescription("");
                    setMyName("");
                    setMyPrice(0);
                    return;
               }
               toast.error("Erro ao adicionar categoria");
               return;
          }).catch(() => {
               toast.error("Erro ao adicionar categoria");
          })

     }

     async function loadCategory() {
          await api.get("/category").then((response) => {

               if (response.status === 200) {
                    if (response.data.length === 0) {
                         toast.error("Nenhuma categoria cadastrada");
                         setCategory([]);
                         return;
                    }

                    setCategory(response.data);
                    setMyCategory(response.data[0]);
                    return;
               }

          }).catch((error) => {
               toast.error("Erro ao carregar categorias");
               console.log(error);
          })

          return;
     }

     
     return (
          <ModalComponent textButton="adicionar" id="form-data">
                    <div>
                         <label htmlFor="name">Nome do serviço</label>
                         <input type="text" name="name" id="name" placeholder="Nome do serviço" onChange={(e) => setMyName(e.target.value)} value={myName}/>
                    </div>
                    <div>
                         <label htmlFor="price">Preço</label>
                         <input type="number" name="price" id="price" placeholder="Preço" min="0" onChange={(e) => setMyPrice(e.target.value)} value={myPrice}/>
                    </div>
                    <div>
                         <label htmlFor="description">Descrição</label>
                         <textarea name="description" id="description" placeholder="Descrição" onChange={(e) => setMyDescription(e.target.value)} value={myDescription}></textarea>
                    </div>
                    <div>
                         <label htmlFor="category">Categoria</label>
                         <select name="category" id="category" value={myCategory} onChange={(e) => {
                              category.filter((category) => {
                                   if (category.name === e.target.value) {
                                        setMyCategory(category.name);
                                        return;
                                   }
                              })
                         }}>
                              {
                                   category.map((category) => {
                                        return (
                                             <option key={category._id} value={category.name}>{category.name}</option>
                                        )
                                   })
                              }
                         </select>
                    </div>
                    <button onClick={() => clickButton()}>Confirmar</button>
          </ModalComponent>
     )

}