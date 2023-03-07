export default function user(state=[], action)
{
     switch (action.type)
     {
          case 'LOGIN_SUCCESS':
               return { user: action.user };
          case 'REGISTER_SUCCESS':
               return {  user: action.user };
          case 'LOGOUT_SUCCESS':
               return { user: null };
          default:
               return state;
     }
}