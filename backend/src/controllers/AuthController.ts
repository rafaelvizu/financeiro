import bcrypt from 'bcryptjs';

import User from "../models/Users";
import { validateEmail, validateName, validatePassword } from "../helpers/validateHelper";

export default class AuthController
{
     static async login(req:any, res:any)
     {
          // code
          const { email, password } = req.body;


          if (!email || !password)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (!validateEmail(email) || !validatePassword(password))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          const user = await User.findOne({ email })
          .catch((err) => {
               console.error(`auth/login: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });

          if (!user) return res.status(401).json({ message: "Unauthorized" });

          await bcrypt.compare(password, user.password)
          .then(async() => {
               const userData = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image_url: user.image_url,
                    created: user.created
               };

               req.session.userid = userData.id;
               await req.session.save((err:any) => {
                    if (err) {
                         console.error(err);
                         return res.status(500).json({ message: "Internal Server Error" });
                    }
                    console.log(req.session);
                    return res.status(201).json({ user: userData });
               });
          })
          .catch(() => {
               return res.status(401).json({ message: "Unauthorized" });
          });

     
     }

     static async register(req:any, res:any)
     {
          // code
          const { name, email, password } = req.body;

          if (!name || !email || !password || !req.file)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (!validateName(name) || !validateEmail(email) || !validatePassword(password))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (await User.findOne({ email }, { email: 1 }))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          await User.create({
               name,
               email,
               password: await bcrypt.hash(password, 10),
               image_url: `http://localhost:3000/images/${req.file.filename}`,
               created: new Date()
          }  )
          .then((doc:any) => {
               const user = {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    image_url: doc.image_url,
                    created: doc.created
               }

               req.session.userid = doc._id;
               req.session.save((err:any) => {
                    if (err) console.error(err);

                    return res.status(201).json({ user });
               });

          })
          .catch((err) => {
               console.error(`auth/register: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          })
     }

     static async logout(req:any, res:any)
     {
          // code
          req.session.destroy((error:any) => {
               if (error) console.error(error);
               return res.status(200).json({ message: "Logout success" });
          });
     }


     static async getUser(req:any, res:any)
     {
          console.log(req.session);
          // code
          await User.findById(req.session.userid, { password: 0})
          .then((doc:any) => {
               if (!doc) return res.status(401).json({ message: "Unauthorized" });

               const user = {
                    id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    image_url: doc.image_url,
                    created: doc.created
               }

               return res.status(200).json({ user });
          })
          .catch((err) => {
               console.error(`auth/getUser: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }
}

