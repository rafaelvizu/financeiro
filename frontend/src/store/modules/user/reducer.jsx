export default function user(state=[], action)
{
     switch (action.type)
     {
          case 'LOGIN_SUCCESS':
               return {  ...state, ...action.user };
          case 'REGISTER_SUCCESS':
               return { ...state, ...action.user };
          case 'LOGOUT_SUCCESS':
               return { ...state, user: {} };
          case 'AUTH_LOADING':
               return { ...action.value };
          default:
               return state;
     }
}