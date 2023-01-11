import { useState } from "react"

export default function EditComponent(props) {

     const [name, setName] = useState('');
     const [description, setDescription] = useState('');
     const [price, setPrice] = useState(0);
     const [category, setCategory] = useState(''); 

     return (
          <main>
               <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="description">Descrição</label>
                    <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <label htmlFor="price">Preço</label>
                    <input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

                    <label htmlFor="category">Categoria</label>
                    
               </div>
          </main>
     )
}