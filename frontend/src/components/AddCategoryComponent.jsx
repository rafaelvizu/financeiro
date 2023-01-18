import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import ModalComponent from "./ModalComponent";

export default function AddCategoryComponent(props) {
     const [myId, setMyId] = useState("");
     const [myName, setMyName] = useState("");
     const [myDescription, setMyDescription] = useState("");

     useEffect(() => {
          if (props.editData) {
               setMyId(props.editData._id);
               setMyName(props.editData.name);
               setMyDescription(props.editData.description);
          }

     }, []);

     function clickButton() {
          
     }

     return (
          <ModalComponent textButton="adicionar" id="form-data">
               <div>
                    <label htmlFor="name">Nome da categoria</label>
                    <input type="text" name="name" id="name" placeholder="Nome do categoria" onChange={(e) => setMyName(e.target.value)} value={myName}/>
               </div>
               <div>
                    <label htmlFor="description">Descrição</label>
                    <input type="text" name="description" id="description" placeholder="Descrição" onChange={(e) => setMyDescription(e.target.value)} value={myDescription}/>
               </div>

               <button>Confirmar</button>

          </ModalComponent>
     )
}