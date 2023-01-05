import { useState, useEffect } from "react";
import api from "../services/api";

export default function addService() {
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const [price, setPrice] = useState(0);
     const [category, setCategory] = useState([]);

     useEffect(() => {});

     return (
          <main>
               <h1>Adicionar Serviço</h1>

          </main>
     )
}