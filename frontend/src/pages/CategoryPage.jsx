import api from '../services/api';
import { useEffect, useState } from 'react';
import LoadingComponent from '../components/LoadingComponent';
import '../assets/styles/service_and_category.css'
import AddCategoryComponent from '../components/AddCategoryComponent';
import DetailsComponent from '../components/DetailsComponent';



export default function CategoryPage() {
     const [category, setCategory] = useState([]);
     const [loadStatus, setLoadStatus] = useState(false);

     async function getApiAsync() {
          while (true) {
          try {
               const response = await api.get("/category")

               if (!response) {
                    setLoadStatus(false);

               } else if (response.status === 200) {
                    setLoadStatus(true);
                    setCategory(response.data);
               }

               await new Promise((resolve) => setTimeout(resolve, 6000));
               
          } catch (error) {
               console.error(error);
               setLoadStatus(false);
               await new Promise((resolve) => setTimeout(resolve, 6000)); 
          }
          
          }

     }

     useEffect(() => {
          getApiAsync();
     }, [])

     return (
          !loadStatus? <LoadingComponent/> :
          <main className="service-and-category">
               <h2>Categorias</h2>
               <hr/>
               <AddCategoryComponent/>
               <div className="data-container">
                    {
                         category.map((category) => {
                              return (
                                   <article key={category._id} className='data'>
                                        <h3>
                                             {category.name.length > 10 ?
                                             category.name.substring(0, 10) + "..." :
                                             category.name
                                             }
                                        </h3>
                                        <p>
                                             {
                                                  category.description.length > 20 ?
                                                  category.description.substring(0, 20) + "..." :
                                                  category.description
                                             
                                             }
                                        </p>
                                        <DetailsComponent data={category} url="/category"/>
                                   </article>
                              )
                         })
                    }     
               </div>    
          </main>
     )
}