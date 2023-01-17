import { useState, useEffect } from "react";
import api from "../services/api";
import LoadingComponent from "../components/LoadingComponent";
import '../assets/styles/service_and_category.css'
import closeIcon from '../assets/images/icon_close.svg'

export default function ServicePage() {
     const [category, setCategory] = useState([]); 
     const [services, setServices] = useState([]);
     const [loadStatus, setLoadStatus] = useState(false);

     async function getApiAsync() {
               while (true) {
               try {
                    const response = await api.get("/services")

                    if (!response) {
                         setLoadStatus(false);

                    } else if (response.status === 200) {
                         setLoadStatus(true);
                         setServices(response.data);
                    }

                    await new Promise((resolve) => setTimeout(resolve, 5000));
                    
               } catch (error) {
                    console.error(error);
                    setLoadStatus(false);
                    await new Promise((resolve) => setTimeout(resolve, 2000)); 
               }
               
          }
     }

          function openForm() {
               const div = document.querySelector(".add-div");
               
               div.style.display = "flex";
          }

     function closeForm() {
          const div = document.querySelector(".add-div");
          div.style.display = "none";
     }

     useEffect(() => {
          getApiAsync();
     }, []);

     return (
          !loadStatus?<LoadingComponent/>
          :
          <main className="service-and-category">
               <h2>Serviços</h2>
               <hr/>
               <div className="add-container">
                         <div className="add-div">
                              <div className="form-data">
                                   <img src={closeIcon} alt="Fechar" onClick={() => closeForm()}/>
                                   <div>
                                        <label htmlFor="name">Nome do serviço</label>
                                        <input type="text" name="name" id="name" placeholder="Nome do serviço"/>
                                   </div>
                                   <div>
                                        <label htmlFor="price">Preço</label>
                                        <input type="number" name="price" id="price" placeholder="Preço" min="0"/>
                                   </div>
                                   <div>
                                        <label htmlFor="description">Descrição</label>
                                        <textarea name="description" id="description" placeholder="Descrição"></textarea>
                                   </div>
                                   <div>
                                        <label htmlFor="category">Categoria</label>
                                        <select name="category" id="category">
                                        </select>
                                   </div>
                                   <button>Adicionar</button>
                              </div>
                    </div>  
                    <button onClick={() => {openForm()}}>Adicionar serviços</button>
               </div>

               <div className="data-container">
                    {services.map((service) => {
                         return (
                              <article key={service._id} className="data">
                                   <h3>R$ {service.price.toFixed(2)}</h3>
                                   <p>
                                        {
                                             service.name.length > 10 ?
                                             service.name.substring(0, 20) + "..." :
                                             service.name
                                        }
                                   </p>
                                   <button>detalhes</button>
                              </article>
                         )
                    })}
               </div>
          </main>
     )
}