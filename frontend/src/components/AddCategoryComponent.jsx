import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import ModalComponent from "./ModalComponent";
import { validateCategory } from '../services/validation';    

export default function AddCategoryComponent(props) {
     const [myId, setMyId] = useState("");
     const [myName, setMyName] = useState("");
     const [myDescription, setMyDescription] = useState("");

     useEffect(() => {
          if (props.editData) {
               if (props.editData._id) {
                    setMyId(props.editData._id);
                    setMyName(props.editData.name);
                    setMyDescription(props.editData.description);
               }

          } else setMyId("add");

          
     }, []);

     async function clickButton() {
          const category = {
               name: myName,
               description: myDescription
          };

          if (!validateCategory(category)) return;
               
          if (myId !== "add") {
               category.id = myId;

               await api.put(`/category/update`, category).then((response) => {
                    if (response.status === 200) {
                         toast.success("Categoria editada com sucesso");
                         return;
                    }

                    toast.error("Erro ao editar categoria");
               }).catch(() => {
                    toast.error("Erro ao editar categoria");
               });

               return;
          }

          await api.post(`/category/add`, category)
          .then((response) => {
               if (response.status === 200) {
                    toast.success("Categoria adicionada com sucesso");
                    setMyDescription("");
                    setMyName("");
                    return;
               }
               toast.error("Erro ao adicionar categoria");
               return;
          }).catch(() => {
               toast.error("Erro ao adicionar categoria");
          })

     }

     return (
          <ModalComponent textButton={myId=='add'?'adicionar':'editar'} dataID={`category-form-${myId}`}>
               <div id="form-data">
                    <div>
                         <label htmlFor="name">Nome da categoria</label>
                         <input type="text" name="name" id="name" placeholder="Nome do categoria" onChange={(e) => setMyName(e.target.value)} value={myName}/>
                    </div>
                    <div>
                         <label htmlFor="description">Descrição</label>
                         <textarea name="description" id="description" placeholder="Descrição" onChange={(e) => setMyDescription(e.target.value)} value={myDescription}></textarea>
                    </div>
                    <button onClick={() => clickButton()}>Confirmar</button>
               </div>

          </ModalComponent>
     )
}