import express from 'express';
import DB from './db';
import categoryRoute from './routes/categoryRoute';
import servicesRoute from './routes/servicesRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/category', categoryRoute);
app.use('/services', servicesRoute);

DB.connect()
.then(() => {
     app.listen(3000, () => {
          console.log("Server running on port 3000");
     });
})
.catch(err => {
     console.error(err);
});