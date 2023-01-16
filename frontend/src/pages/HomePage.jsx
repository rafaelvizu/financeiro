import api from "../services/api";
import { useEffect, useState } from "react";
import "../assets/styles/home.css"; 
import LoadingComponent from "../components/LoadingComponent";


export default function Home() {
     
     const [serviceCount, setServiceCount] = useState(0);
     const [categoryCount, setCategoryCount] = useState(0);
     const [totalPrice, setTotalPrice] = useState(0);
     const [loadStatus, setLoadStatus] = useState(false);

     async function getApiAsync() {
          while (true) {
               try {
                    const response = await api.get("/")

                    if (!response) {
                         setLoadStatus(false);

                    } else if (response.status === 200) {
                         setLoadStatus(true);
                         setServiceCount(response.data.serviceCount);
                         setCategoryCount(response.data.categoryCount);
                         setTotalPrice(response.data.totalPrice);
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
               !loadStatus? <main><LoadingComponent /></main> : 
               <main id="home">
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
                              <p>R$ {totalPrice.toFixed(2)}</p>
                              <h3>Total de preços</h3>
                         </article>
     
                    </div>
               </main>
          )          
     }