import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; 
import ServicePage from './pages/ServicePage';
import CategoryPage from './pages/CategoryPage';
import Header from './components/Header';

function RouteApp() {
     return (
          <BrowserRouter>
               <Header/>
               <Routes>
                    <Route path="/category" element={<CategoryPage/>}/>
                    <Route path="/services" element={<ServicePage/>}/>
                    <Route path="/" element={<Home/>}/>
               </Routes>
          </BrowserRouter>
     )
}


export default RouteApp;