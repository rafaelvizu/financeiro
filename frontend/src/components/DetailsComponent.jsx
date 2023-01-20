import { useState, useEffect } from "react";
import  ModalComponent from '../components/ModalComponent';
import api from '../services/api';
import { toast } from "react-toastify";
import AddCategoryComponent from './AddCategoryComponent';
import AddServiceComponent from './AddServiceComponent';

export default function DetailsComponent(props) {
     const [data, setData] = useState({});
     const [url, setUrl] = useState("");

     useEffect(() => {
          setData(props.data);
          setUrl(props.url);

     }, [props.data, props.type])
     

     function deleteData() {
          api.delete(`${url}/delete/${data._id}`)
          .then(response => {
               if (response.status === 200) {
                    toast.success("Excluído com sucesso!");
                    return;
               }

               toast.error("Erro ao excluir!");
          })
          .catch(error => {
               console.error(error)
               toast.error("Erro interno ao excluir!");
               return
          })
     }


     return (
          <ModalComponent textButton="Detalhes" dataID={`details-${data._id}`}>
                         <article className="details-data">
                              <h2>Detalhes</h2>
                              <p>
                                   <strong>id:</strong> {data._id}
                              </p>
                              <p>
                                   <strong>Nome:</strong> {data.name}
                              </p>
                              {
                                   url == "/services" &&
                                   <p>
                                        <strong>Preço:</strong> R${data.price.toFixed(2)}
                                   </p>
                              }
                              {
                                   url == "/services" &&
                                   <p>
                                        <strong>Categoria:</strong> {data.category}
                                   </p>
                              }
          
                              <p className="description-container">
                                   <strong>Descrição</strong> 
                                   <textarea value={data.description} cols="20" rows="10"></textarea>
                                   
                              </p>
                              <p>
                                   <strong>Criado em: </strong>
                                   {data.createAt}<br></br>
                                   <strong>Última atualização:</strong> {data.updateAt}
                              </p>

                              <div className="container-edit-delete-button">
                                   {
                                        url == "/services"?
                                        <AddServiceComponent editData={data} /> :
                                        <AddCategoryComponent editData={data}/>

                                   }
                                   <button onClick={() => deleteData()}>excluir</button>
                              </div>
                         </article>
          </ModalComponent>

     )
}