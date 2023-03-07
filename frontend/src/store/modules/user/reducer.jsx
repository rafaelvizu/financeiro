export default function user(state=[], action)
{
     switch (action.type)
     {
          case 'LOGIN_SUCCESS':
               return {  ...state, user: action.user };
          case 'REGISTER_SUCCESS':
               return { ...state, user: action.user };
          case 'LOGOUT_SUCCESS':
               return { ...state, user: {} };
          case 'AUTH_LOADING':
               return { ...state, ...action.loading };
          default:
               return state;
     }
}