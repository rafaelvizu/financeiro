import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import AddCategory from './pages/AddCategory'

function RouteApp() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path='/addcategory' element={<AddCategory/>}/>
                    <Route path="/" element={<Home/>}/>
               </Routes>
          </BrowserRouter>
     )
}


export default RouteApp;