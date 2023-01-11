import api from "../services/api";
import { useEffect, useState } from "react";
import "../assets/styles/home.css"; 
import { Link } from "react-router-dom";
import ServiceComponent from "../components/ServiceComponent";

export default function Home() {
     const [services, setServices] = useState({});
     const [totalPrice, setTotalPrice] = useState(0);
     const [totalServices, setTotalServices] = useState(0);

     async function setTotal(data) {
          let price = 0;

          data.forEach(service => {
               price += service.price;
          });

          setTotalPrice(price);
          setTotalServices(data.length);
          setServices(data);
          
          return;
     }

     useEffect(() => {
          api.get("/services").then(async (response) => {
               api.validateDataApi(services, response) && await setTotal(response.data);
               return;
          });
     }, []);

     // real-time
     useEffect(() => {
          api.getTimeout("/services", 20000).then(async (response) => {
               api.validateDataApi(services, response) && await setTotal(response.data);
               return;
          });
     });

     return (
          <main className="home-container">    
               <div className="total-container">
                    <div>
                         <p>
                              R$ {totalPrice.toFixed(2)}
                         </p>
                         <h6>Valor total</h6>
                    </div>
                    <div>
                         <p>
                              {totalServices}
                         </p>
                         <h6>Total de serviços</h6>
                    </div>

               </div>
               <div className="sub-container">
                    <ul>
                         <li><Link to="/addservice">Adicionar serviço</Link></li>
                         <li><Link to="/addcategory">Adicionar categória de serviço</Link></li>
                    </ul>
                    <ServiceComponent services={services}/>
               </div>
 
          </main>
     )
}