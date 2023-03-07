import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest, registerRequest } from '../../store/modules/user/actions';

export default (props) => {
     const [pageTo, setPageTo] = useState('');

     const [userImage, setUserImage] = useState('');
     const [name, setName] = useState(''); 
     const [email, setEmail] = useState(''); 
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');


     const dispatch = useDispatch();



     useEffect(() => {
          setPageTo(props.pageTo);

     }, [props.pageTo]);


     function handleSubmit(e)
     {
          e.preventDefault();

          if (pageTo == 'LOGIN')
          {
               dispatch(loginRequest(email, password));
               return;
          }

          dispatch(registerRequest(email, password, name, userImage));
     }

     return (
          <main>
               <h1>{pageTo=='LOGIN'?'Entrar':'Registrar-se'}</h1>

               <form onSubmit={handleSubmit}>
                    {
                         pageTo=='REGISTER' &&
                         <>
                              <div>
                                   <label htmlFor="user-image">Imagem de perfil</label>
                                   <input type="file" name="user_image" id="user-image" 
                                   value={userImage} onChange={(e) => setUserImage(e.target.value)}/>
                              </div>

                              <div>
                                   <label htmlFor="name">Nome</label>
                                   <input type="text" name="name" id="name" value={name}
                                   onChange={(e) => setName(e.target.value)}/>
                              </div>
                         </>
                    }
                    <div>
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" id="email" 
                         value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div>
                         <label htmlFor="password">Senha</label>
                         <input type="password" name="password" id="password" 
                         value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {pageTo=='REGISTER' && 
                         <div>
                              <label htmlFor="confirm-password">Confirmar senha</label>
                              <input type="password" name="confirm_password" id="confirm-password" 
                              value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                         </div>
                    }

                    <button type="submit">{pageTo=='LOGIN'?'Entrar':'Registrar-se'}</button>
               </form>
          </main>
     )
}