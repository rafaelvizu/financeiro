import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ServiceComponent(props)
{
     const [services, setServices] = useState([]);

     useEffect(() => {
          let services = props.services;
          if (services.length == 0 || services.length == undefined) {
               setServices([])
               return;
          }
          
          setServices(props.services)
     }, [props.services])
     return (
          <table>
          <thead>
               <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Categoria</th>
                    <th>Preço</th>
               </tr>

          </thead>

          <tbody>   
               {   
                    services.map((service) => {
                         return (
                              <tr key={service._id}>
                                   <td><Link to={`/service/${service._id}`}>{service.name}</Link></td>
                                   <td>
                                        {
                                             service.description.length > 20 ?
                                             service.description.substring(0, 10) + "..." :
                                             service.description
                                        }
                                   </td>
                                   <td>{service.category}</td>
                                   <td>R$ {service.price.toFixed(2)}</td>
                              </tr>
                         )
                    })
               }

          </tbody>

     </table>
     )
}
