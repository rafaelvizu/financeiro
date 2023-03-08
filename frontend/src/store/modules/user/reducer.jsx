export default function user(state=[], action)
{
     switch (action.type)
     {
          case 'LOGIN_SUCCESS':
               return {  ...action.user };
          case 'REGISTER_SUCCESS':
               return { ...action.user };
          case 'LOGOUT_SUCCESS':
               return { };
          default:
               return state;
     }
}