import { BrowserRouter, Routes, Route } from "react-router-dom";

import RouteWrapper from './Route';
import Home from "../pages/Home";
import Auth from "../pages/Auth";

export default () => {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/auth/register" element={ <RouteWrapper isPrivate={false} defaultComponent={<Auth pageTo="REGISTER"/>} /> }/>
                    
                    <Route path="/auth/login" element={ <RouteWrapper isPrivate={false} defaultComponent={<Auth pageTo="LOGIN"/>} /> }/>
                    
                    <Route path="/" element={ <RouteWrapper isPrivate={true} defaultComponent={<Home />} /> }/>
               </Routes>
          </BrowserRouter>
     )
}