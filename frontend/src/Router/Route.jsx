import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkRequest, authLoading } from '../store/modules/user/actions';

export default function RouteWrapper({ isPrivate, defaultComponent }) 
{
     const [signed, setSigned] = useState(false);
     const user = useSelector(state => state.user);
     
     const dispatch = useDispatch();    

     useEffect(() => {
          dispatch(checkRequest()); 
     }, []);

     useEffect(() => {
          console.log(user);
          if (user.user)
          {
               setSigned(true);
          }
          else 
          {
               setSigned(false);
          }

     }, [user.user]);



     

     if (true) return <></>

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