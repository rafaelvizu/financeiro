import { useState, useEffect } from "react";
import api from "../services/api";
import LoadingComponent from "../components/LoadingComponent";
import '../assets/styles/service_and_category.css'
import AddServiceComponent from "../components/AddServiceComponent";
import DetailsComponent from "../components/DetailsComponent";


export default function ServicePage() {
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

     useEffect(() => {
          getApiAsync();
     }, []);

     return (
          !loadStatus?<LoadingComponent/>
          :
          <main className="service-and-category">
               <h2>Serviços</h2>
               <hr/>
               <AddServiceComponent/>
 

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
                                  <DetailsComponent data={service} url="/service"/>
                              </article>
                         )
                    })}
               </div>
          </main>
     )
}