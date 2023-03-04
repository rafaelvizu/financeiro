import Services from '../models/Services';

export default class ServiceController {
     static async getServices(req:any, res:any)
     {
          await Services.find({userid: req.session.userid})
          .then((doc) => {
               return res.json(doc).status(200);
          })
          .catch((err) => {
               console.error(`service/getServices: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }

     static async getService(req:any, res:any) 
     {
          await Services.findOne({ _id: req.params.id, userid: req.session.userid })
          .then((doc) => {
               return res.json(doc).status(200);
          })
          .catch((err) => {
               console.error(`service/getService: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }


     static async addService(req:any, res:any)
     {
     }

     static async updateService(req:any, res:any)
     {
          const { id } = req.params;
          const { name, description, price } = req.body;

          if (!name || !description || !price)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          await Services.findOneAndUpdate({ _id: id, userid: req.session.userid }, { name, description, price })
          .then(() => {
               return res.sendStatus(200);
          })	
          .catch((err) => {
               console.error(`service/updateService: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

}

