import { useState, useEffect } from "react";
import  ModalComponent from '../components/ModalComponent';
import api from '../services/api';
import { toast } from "react-toastify";

export default function DetailsComponent(props) {
     const [service, setService] = useState({});

     useEffect(() => {
          setService(props.service);
     }, [])
     
     function deleteService(url) {
          api.delete(`${url}/${service._id}`)
          .then(response => {
               if (response.status === 200) {
                    toast.success("Serviço excluído com sucesso!");
                    return;
               }

               toast.error("Erro ao excluir serviço!");
          })
          .catch(error => {
               console.error(error)
               toast.error("Erro ao excluir serviço!");
               return
          })
     }

     return (
          <ModalComponent textButton="Detalhes" id={`details${service._id}`}>
                         <article className="details-data">
                              <h2>Detalhes</h2>
                         
                              <p>
                                   <strong>id:</strong> {service._id}
                              </p>
                              <p>
                                   <strong>Nome:</strong> {service.name}
                              </p>
                              <p>
                                   <strong>Preço:</strong> R${service.price}
                              </p>
                              <p className="description-container">
                                   <strong>Descrição</strong> 
                                   <textarea value={service.description}></textarea>
                              </p>

                              <div>
                                   <button>editar</button>
                                   <button onClick={() => deleteService('/services/delete')}>excluir</button>
                              </div>
                         </article>
          </ModalComponent>

     )
}