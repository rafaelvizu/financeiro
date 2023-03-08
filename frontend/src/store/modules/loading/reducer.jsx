export default function loading(state=false, action)
{
     switch (action.type)
     {
          case 'SET_LOADING':
               return action.loading;
          default:
               return state;
     }
}