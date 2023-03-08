import User from "../models/Users";

export async function checkAuth(req:any, res:any, next:any)
{     
     if (!req.session.userid) return res.status(401).json({ message: "Unauthorized" });

     await User.findById({ _id: req.session.userid}, {  email: 0, password: 0, image_url: 0 })
     .then(async (doc) => {
          if (doc) return next();

          await req.session.destroy((error:any) => {
               if (error) return res.status(500).json({ message: "Internal Server Error" });
               return res.status(401).json({ message: "Unauthorized" });

          });
     })
     .catch(async (err) => {
          await req.session.destroy((error:any) => {
               if (error) console.error(error);
          });
          console.error(`checkAuth: ${err}`);
          return res.status(500).json({ message: "Internal Server Error" });
     });   
}

export async function checkUnAuth(req:any, res:any, next:any)
{
     if (!req.session.userid) return next();
     
     await User.findById({ _id: req.session.userid}, {  email: 0, password: 0, image_url: 0 })
     .then(async (doc) => {
          if (!doc) {
               await req.session.destroy((error:any) => {
                    if (error) console.error(error);
                    return next();
               });
               
          }

          return res.status(401).json({ message: "Unauthorized" });
     })
     .catch(async (err) => {
          await req.session.destroy((error:any) => {
               if (error) console.error(error);
          });
          console.error(`checkUnAuth: ${err}`);
          return res.status(500).json({ message: "Internal Server Error" });
     });
}