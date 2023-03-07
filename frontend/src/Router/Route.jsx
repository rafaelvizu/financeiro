import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


export default function RouteWrapper({ isPrivate, defaultComponent }) 
{
     const [loading, setLoading] = useState(false);
     const signed = useSelector(state => state.user.signed);

     useEffect(() => {
          console.log('signed: ', signed);
     }, []);
     

     if (loading) return <></>

     if (!signed && isPrivate)
     {
          return <Navigate to="/auth/login" />
     }

     if (signed && !isPrivate)
     {
          return <Navigate to="/" />
     }
     

     return defaultComponent;
}