import axios from 'axios';

console.log()

export default axios.create({
     baseURL: import.meta.env.VITE_API_LINK, 
     timeout: 5000,
     headers: {
          'x-acess-token': import.meta.env.VITE_PASSWORD
     }
});