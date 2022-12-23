import api from "../services/api"
import { useEffect, useState } from "react"

export default function Home() {
     const [services, setServices] = useState([]);
     const [totalPrice, setTotalPrice] = useState(0);
     const [totalServices, setTotalServices] = useState(0);
     const [totalCategory, setTotalCategory] = useState(0);

     function setTotal() {
          services.map((service) => {
               setTotalPrice(totalPrice + service.price);
               setTotalServices(totalServices + 1);
               setTotalCategory(totalCategory + 1);
          });
     }

     useEffect(() => {
          api.get("/services").then((response) => {
               setServices(response.data);               
               setTotal();
          });
     }, []);

     // real-time
     useEffect(() => {
          setTimeout(() => {
               api.get("/services").then((response) => {
                    if (response.data == services) return;

                    setServices(response.data);
                    setTotal();
               });
          }, 60000);
     }, [services]);

     return (
          <main>    
               <h1>Home</h1>

               {
                    services.map((service) => {
                         return (
                              <div key={service._id}>
                                   <h2>{service.name}</h2>
                                   <p>{service.description}</p>
                              </div>
                         )
                    })
               }
          </main>
     )
}