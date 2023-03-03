// foreign imports
import express, { Request, Response } from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';
import 'dotenv/config';

// local imports
import { clearSessionTask } from './helpers/sessionMenagerHelper';
import MongoDB from './db/MongoDB';
 
declare module 'express-session' {
     export interface SessionData {
          userid: string;
     }
}


const app = express();  
const FStore = FileStore(session);
const SESSION_TIME_LIVE = 1000; // 1 hour

// config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
     secret: process.env.SECRET_SESSION || 'secret',
     resave: false,
     saveUninitialized: true,
     store: new FStore({ 
          logFn: function() {},
          path: './sessions'
     }),
     cookie: {
          maxAge: SESSION_TIME_LIVE,
          secure: false,
          httpOnly: true,
     }
}));

// clear session task
clearSessionTask(SESSION_TIME_LIVE);


// middleware
app.use((req:Request, res:Response, next) => {
     if (req.session.userid)
     {
          res.locals.userid = req.session.userid;
     }

     next();
});


MongoDB.Connect()
.then(() => {
     console.clear();
     console.log('MongoDB: Connected');
     app.listen((process.env.PORT || 3000), () => console.log(`Server: Running on port http://localhost:${process.env.PORT || 3000}`))
})
