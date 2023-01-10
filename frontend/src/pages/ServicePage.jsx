import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ServicePage() {

     const { id } = useParams();
     const [service, setService] = useState([]);

     useEffect(() => {
          getApi();

          return;
     }, [])

     useEffect(() => {
          setTimeout(async () => {
               await getApi();
               return;
          }, 60000)
     });


     async function getApi() {
          await api.get("/services/" + id).then((response) => {
               if (response.data == service) return;


               setService(response.data);
               setService(response.data);


               return;
          });
     }

     return (
          <main>
               <article>
                    <h1><strong>Nome:</strong>{service.name}</h1>
                    <p><strong>Descrição:</strong> {service.description}</p>
                    <p><strong>R$: </strong> {service.price!==undefined?service.price.toFixed(2):''}</p>
                    <p>{service.category}</p>
               </article>

          </main>
     )
}