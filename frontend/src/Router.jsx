import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import AddCategory from './pages/AddCategory'
import AddService from './pages/AddService'
import ServicePage from './pages/ServicePage';

function RouteApp() {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path='/service/:id' element={<ServicePage/>}/>
                    <Route path='/addservice' element={<AddService/>}/>
                    <Route path='/addcategory' element={<AddCategory/>}/>
                    <Route path="/" element={<Home/>}/>
               </Routes>
          </BrowserRouter>
     )
}


export default RouteApp;