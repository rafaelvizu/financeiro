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
     const [myId, setMyId] = useState("");

     useEffect(() => {   
          loadCategory();       
          if (props.editData) {

               if (props.editData._id) {
                    setMyId(props.editData._id);
                    setMyName(props.editData.name);
                    setMyPrice(props.editData.price);
                    setMyDescription(props.editData.description);
                    setMyCategory(props.editData.category);
               }
          } else setMyId("add");

     }, []);

     async function clickButton() {
          const service = {
               id: myId!=='add' ? myId : "",
               name: myName,
               description: myDescription,
               price: myPrice,
               category: myCategory,
          };

          if (!validateService(service)) return;
               
          if (myId !== "add") {
               
               await api.put(`/services/update`, service).then((response) => {
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

          await api.post(`/services/add`, service)
          .then((response) => {
               if (response.status === 200) {
                    toast.success("Servi??o adicionada com sucesso");
                    setMyDescription("");
                    setMyName("");
                    setMyPrice(0);
                    return;
               }
               toast.error("Erro ao adicionar servi??o");
               return;
          }).catch(() => {
               toast.error("Erro ao adicionar servi??o");
          })

     }

     async function loadCategory() {
          await api.get("/category").then((response) => {

               if (response.status === 200) {                    
                    const data = response.data;

                    if (!data.length) {
                         setCategory([]);
                         setMyCategory("");
                         return;
                    }

                    setCategory(data);
                    

                    if (myId !== 'add') {
                         let myCat;
                         data.filter((cat) => {
                              if (cat.name === myCategory) {
                                   myCat = cat.name;
                                   return;
                              }
                         });

                         if (myCat) {
                              setMyCategory(myCat);
                              return;
                         }
                    }

                    setMyCategory(data[0].name);
                    return;

               }

          }).catch((error) => {
               toast.error("Erro ao carregar categorias");
               console.log(error);
          })

          return;
     }

     
     return (
          <ModalComponent textButton={myId=='add'?'adicionar':'editar'} dataID={`service-form-${myId}`}>
                    <div id="form-data">
                         <div>
                              <label htmlFor="name">Nome do servi??o</label>
                              <input type="text" name="name" id="name" placeholder="Nome do servi??o" onChange={(e) => setMyName(e.target.value)} value={myName}/>
                         </div>
                         <div>
                              <label htmlFor="price">Pre??o</label>
                              <input type="number" name="price" id="price" placeholder="Pre??o" min="0" onChange={(e) => setMyPrice(e.target.value)} value={myPrice}/>
                         </div>
                         <div>
                              <label htmlFor="description">Descri????o</label>
                              <textarea name="description" id="description" placeholder="Descri????o" onChange={(e) => setMyDescription(e.target.value)} value={myDescription}></textarea>
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
                    </div>
          </ModalComponent>
     )

}