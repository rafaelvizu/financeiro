import { BrowserRouter, Routes, Route } from "react-router-dom";

import RouteWrapper from './Route';
import Home from "../pages/Home";


export default () => {
     return (
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={ <RouteWrapper isPrivate={true} defaultComponent={<Home />} /> }/>
               </Routes>
          </BrowserRouter>
     )
}