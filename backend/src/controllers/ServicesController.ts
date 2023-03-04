import Services from '../models/Services';
import { Types } from 'mongoose';

import Clients from '../models/Clients';

export default class ServiceController {

     static async getServices(req:any, res:any)
     {
          await Services.find({userid: req.session.userid}, {userid: 0, __v: 0})
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
          await Services.findOne({ _id: req.params.id, userid: req.session.userid }, {userid: 0, __v: 0})
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
          const { name, description, price, clientid } = req.body;

          if (!name || !price || !clientid)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (!Types.ObjectId.isValid(clientid))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (name || typeof name !== 'string' || name.length < 3 || name.length > 50)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (description && typeof description !== 'string' || description.length < 3 || description.length > 100)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (price || typeof price !== 'number' || price < 0)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (!await Clients.findOne({ _id: clientid, userid: req.session.userid }))
          {
               return res.status(404).json({ message: "Not Found" });
          }

          await Services.create({
               name,
               description,
               price,
               clientid,
               userid: req.session.userid,
               created: new Date()
          })
          .then(() => {
               return res.sendStatus(201);
          })
          .catch((err) => {
               console.error(`service/addService: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });

     }

     static async updateService(req:any, res:any)
     {
          const { id } = req.params;
          const { name, description, price } = req.body;

          if (!name && !price && !description)
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          if (!Types.ObjectId.isValid(id))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          const update:any = {};

          if (name && typeof name !== 'string' || name.length < 3 || name.length > 50)
          {
               return res.status(400).json({ message: "Bad Request" });
          } else update.name = name;

          if (description && typeof description !== 'string' || description.length < 3 || description.length > 100)
          {
               return res.status(400).json({ message: "Bad Request" });
          } else update.description = description;

          if (price && typeof price !== 'number' || price < 0)
          {
               return res.status(400).json({ message: "Bad Request" });
          } else update.price = price;

          await Services.updateOne({ _id: id, userid: req.session.userid }, update)
          .then((result) => {
               if (result.modifiedCount === 0) 
               {
                    return res.status(404).json({ message: "Not Found" });
               }

               return res.sendStatus(204);
          })
          .catch((err) => {
               console.error(`service/updateService: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          })




     }

     static async deleteService(req:any, res:any)
     {
          const { id } = req.params;

          if (!Types.ObjectId.isValid(id))
          {
               return res.status(400).json({ message: "Bad Request" });
          }

          await Services.deleteOne({ _id: id, userid: req.session.userid })
          .then((result) => {
               if (result.deletedCount === 0) 
               {
                    return res.status(404).json({ message: "Not Found" });
               }

               return res.sendStatus(204);
          })
          .catch((err) => {
               console.error(`service/deleteService: ${err}`);
               return res.status(500).json({ message: "Internal Server Error" });
          });
     }

}

