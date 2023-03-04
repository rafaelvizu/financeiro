// foreign imports
import express, { Request, Response } from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import 'dotenv/config';

// local imports
import { clearSessionTask } from './helpers/sessionMenagerHelper';
import MongoDB from './db/MongoDB';
import authRoute from './routes/authRoute';
 
declare module 'express-session' {
     export interface SessionData {
          userid: string;
     }
}


const app = express();  
const FStore = FileStore(session);
const store = new FStore({ 
     logFn: function() {},
     path: './sessions',
});

const SESSION_TIME_LIVE = 360000; // 1 hour

// config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
     secret: process.env.SECRET_SESSION || 'secret',
     resave: false,
     saveUninitialized: true,
     store: store,
     cookie: {
          maxAge: SESSION_TIME_LIVE,
          secure: false,
          httpOnly: true,
     }
}));

// clear session task
clearSessionTask(SESSION_TIME_LIVE);

// middleware
app.use(async (req:Request, res:Response, next) => {
     if (req.session.userid)
     {
          res.locals.userid = req.session.userid;
     }

     next();
});


// routes
app.use('/auth', authRoute);


app.get('/test', (req:Request, res:Response) => {
     req.session.destroy((err) => {
          if (err) console.error(err);

          console.log('Session destroyed');
          return res.send('sesadad');
     });
})
app.get('/', (req:Request, res:Response) => {

     res.send('Hello World!');
})


MongoDB.Connect()
.then(() => {
     MongoDB.DropDatabase();
     console.clear();
     console.log('MongoDB: Connected');
     app.listen((process.env.PORT || 3000), () => console.log(`Server: Running on port http://localhost:${process.env.PORT || 3000}`))
})
.catch((err) => {
     console.log('MongoDB: ' + err);
});
