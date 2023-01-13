import api from "../services/api";
import { useEffect, useState } from "react";
import "../assets/styles/home.css"; 
import { Link } from "react-router-dom";
import ServiceComponent from "../components/ServiceComponent";

export default function Home() {
     
     const [serviceCount, setServiceCount] = useState(0);
     const [categoryCount, setCategoryCount] = useState(0);
     const [totalPrice, setTotalPrice] = useState(0);


     useEffect(() => {
          api.get("/").then((response) => {
               if (response.status === 200) {
                    setServiceCount(response.data.serviceCount);
                    setCategoryCount(response.data.categoryCount);
                    setTotalPrice(response.data.totalPrice);
               }
          });
     }, []);

     return (
          <main>
               <h2>Dashboard</h2>
               <div className="data-container">
                    <article>
                         <p>{serviceCount}</p>
                         <h3>Total de serviços</h3>
                    </article>

                    <article>
                         <p>{categoryCount}</p>
                         <h3>Total de categorias</h3>
                    </article>

                    <article>
                         <p>{totalPrice}</p>
                         <h3>Total de preços</h3>
                    </article>
               </div>
          </main>
     )
}