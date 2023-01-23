import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import ServicePage from './pages/ServicePage';
import CategoryPage from './pages/CategoryPage';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ErrorPage from './pages/ErrorPage';

function RouteApp() {
     return (
          <BrowserRouter>
               <HeaderComponent/>
               <Routes>
                    <Route path="/category" element={<CategoryPage/>}/>
                    <Route path="/services" element={<ServicePage/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
               </Routes>
               <FooterComponent/>
          </BrowserRouter>
     )
}


export default RouteApp;