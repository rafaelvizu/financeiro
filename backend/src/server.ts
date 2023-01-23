import express from 'express';
import DB from './db';
import categoryRoute from './routes/categoryRoute';
import servicesRoute from './routes/servicesRoute';
import cors from 'cors';
import compression from 'compression';
import homeRoute from './routes/homeRoute';
import 'dotenv/config';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(express.static('public')); 
app.use((req, res, next) => {
     console.log(req.headers['x-acess-token'])
     if (process.env.PASSWORD === req.headers['x-acess-token']) {
          return next();
     }
     
     return res.status(401).json({ message: 'Unauthorized' });
})


app.use('/category', categoryRoute);
app.use('/services', servicesRoute);
app.use('/', homeRoute);

DB.connect()
.then(() => {
     app.listen(3000, () => {
          console.log("Server running on port 3000");
     });
})
.catch(err => {
     console.error(err);  
});