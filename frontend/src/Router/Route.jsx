import { Navigate } from 'react-router-dom';
import { useState } from 'react';


export default function RouteWrapper({ isPrivate, defaultComponent }) 
{
     const [signed, setSigned] = useState(true);
     const [loading, setLoading] = useState(false);


     if (loading) return <></>

     if (!signed && isPrivate)
     {
          return <Navigate to="/login" />
     }

     if (signed && !isPrivate)
     {
          return <Navigate to="/" />
     }
     

     return defaultComponent;
}