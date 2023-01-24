import axios from 'axios';


export default axios.create({
     baseURL: import.meta.env.VITE_API_LINK, 
     timeout: 10000,
     headers: {
          'x-acess-token': import.meta.env.VITE_PASSWORD
     }
});
