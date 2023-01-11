import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";


export default function ServicePage() {

     const { id } = useParams();
     const [service, setService] = useState([]);

     useEffect(() => {
          api.get("/services/" + id).then((response) => {
               api.validateDataApi(service, response) && setService(response.data);
               return;
          });
     }, [])

     useEffect(() => {
          api.getTimeout("/services/" + id, 1000).then((response) => {
               api.validateDataApi(service, response) && setService(response.data);
               return;
          });
     });

     return (
          <main>
               <article>
                    <h1><strong>Nome:</strong>{service.name}</h1>
                    <p><strong>Descrição:</strong> {service.description}</p>
                    <p><strong>R$: </strong> {service.price!==undefined?service.price.toFixed(2):''}</p>
                    <p>{service.category}</p>
               </article>

               <button>Editar</button>

               


          </main>
     )
}