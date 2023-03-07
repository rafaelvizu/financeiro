import { call, put, all, takeLatest } from 'redux-saga/effects';
import { loginSuccess, registerSuccess, logoutSuccess } from './actions';
import { toast } from 'react-toastify';

import api from '../../../services/api';


function* login({ email, password })
{
     const response = yield call(api.post, '/auth/login', { email, password });


     const { user } = response.data;


     if (user)
     {
          return yield put(loginSuccess(user));
     }

     toast.error('E-mail ou senha inválidos');
}


function* register({ email, password })
{
     const response = yield call(api.post, '/auth/register', { email, password });

     const { token, user } = response.data;  

     if (token && user)
     {
          alert('Usuário cadastrado com sucesso!');
          api.defaults.headers.Authorization = `Bearer ${token}`;

          return yield put(registerSuccess(user));
     }

     toast.error('Erro no cadastro, verifique seus dados!');
}


function* logout()
{
     const response = yield call(api.post, '/auth/logout');
     if (response.status === 200)
     {
          api.defaults.headers.Authorization = null;
          return yield put(logoutSuccess());
     }

     toast.error('Erro ao sair do sistema!');
}



export default all([
     takeLatest('LOGIN_REQUEST', login),
     takeLatest('REGISTER_REQUEST', register),
     takeLatest('LOGOUT_REQUEST', logout),
]);


