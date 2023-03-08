import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkRequest } from '../store/modules/user/actions';


export default function RouteWrapper({ isPrivate, defaultComponent }) 
{
     const [signed, setSigned] = useState(false);
     const user = useSelector(state => state.user);
     const loading = useSelector(state => state.loading);
     
     const dispatch = useDispatch();    

     useEffect(() => {
          dispatch(checkRequest());
     }, []);

     useEffect(() => {
          if (user.user)
          {
               setSigned(true);
          }
          else 
          {
               setSigned(false);
          }
          
     }, [user.user]);

     

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