import axios from 'axios';
import { toast } from 'react-toastify';


export default new class Api 
{
     constructor()
     {
          this.connectAPI = axios.create({
               baseURL: 'http://localhost:3000/',
               timeout: 5000,
          });
          
     }

     async get(url)
     {
          return await this.connectAPI.get(url);
     }
     async post(url, data)
     {
          return await this.connectAPI.post(url, data);
     }

     async getTimeout(url, timeout)
     {
          let data = await this.connectAPI.get(url);
          await this.sleep(timeout);     
          return data
     }

     validateDataApi(dataState, response)
     {
          if (!response) return false;
          if (dataState == response.data) return false;
          if (response.data == undefined) return false;
          return response.data;
     }

     sleep(delay) { return new Promise(resolve => setTimeout(resolve, delay)); }

}
