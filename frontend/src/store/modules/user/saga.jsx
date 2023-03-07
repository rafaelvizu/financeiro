import { call, put, all, takeLatest } from 'redux-saga/effects';
import { loginSuccess, registerSuccess, logoutSuccess, authLoading } from './actions';
import { toast } from 'react-toastify';

import api from '../../../services/api';


function* login({ email, password })
{

     try
     {
          put(authLoading(true));
          const response = yield call(api.post, '/auth/login', { email, password }, {
               withCredentials: true,
          });
          const { user } = response.data;
     
          if (user)
          {
               toast.success('Login realizado com sucesso!');
               yield put(loginSuccess(user));
          }
     }
     catch (err)
     {
          toast.error('Erro no login, verifique seus dados!');
     }

     put(authLoading(false));
    
}


function* register({ email, password })
{
     try
     {
          put(authLoading(true));
          const response = yield call(api.post, '/auth/register', { email, password });
          const { user } = response.data;
     
          if (user)
          {
               toast.success('Cadastro realizado com sucesso!');
               yield put(registerSuccess(user));
          }    
     }
     catch (err)
     {
          toast.error('Erro no cadastro, verifique seus dados!');
     }

     put(authLoading(false));
}


function* logout()
{
     try
     {
          put(authLoading(true));
          yield call(api.get, '/auth/logout', {
               withCredentials: true,
          });  
          toast.success('Deslogado com sucesso!');
          yield put(logoutSuccess({}));
     }
     catch
     {
          toast.error('Erro ao deslogar!');
     }

     put(authLoading(false));

}

function* check()
{
     try
     {
          put(authLoading(true));
          const response = yield call(api.get, '/auth/check', {
               withCredentials: true,
          });
          const user = response.data;

          if (user)
          {
               yield put(loginSuccess(user));
          }
     }
     catch
     {
          yield put(logoutSuccess({}));
     }

     put(authLoading(false));
}


export default all([
     takeLatest('LOGIN_REQUEST', login),
     takeLatest('REGISTER_REQUEST', register),
     takeLatest('LOGOUT_REQUEST', logout),
     takeLatest('CHECK_REQUEST', check),
]);


