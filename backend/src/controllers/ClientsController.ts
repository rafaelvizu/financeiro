import { Types } from 'mongoose';

import Clients from '../models/Clients';

import { validateAddress, validateEmail, validateName, validatePhone } from '../helpers/validateHelper'

export default class ClientsController {
     static async getClients(req:any, res:any)
     {

          await Clients.find({userid: req.session.userid}, {userid: 0, __v: 0})
          .then((clients) => {
               clients.reverse();
               return res.status(200).json(clients);
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({message: 'Internal Server Error'})
          });

     }

     static async getClient(req:any, res:any)
     {
          if (!Types.ObjectId.isValid(req.params.id))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          await Clients.findOne({userid: req.session.userid, _id: req.params.id}, {userid: 0, __v: 0})
          .then((client) => {
               if (!client) return res.status(404).json({message: 'Not Found'});
               res.status(200).json(client);
          })
          .catch((err) => {
               console.error(err);
               res.status(500).json({message: 'Internal Server Error'})
          });
     }

     static async createClient(req:any, res:any)
     {
          let { name, email, phone, address } = req.body;
          const userid = req.session.userid;

          if (!name || typeof name !== 'string'|| !userid)
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          name = name.trim();
          if (name.length < 3 || name.length > 50)
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          if (email && !validateEmail(email))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          if (phone && !validatePhone(phone))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          if (address && !validateAddress(address))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          await Clients.create({
               name, 
               email,
               phone,
               address,
               userid
          })
          .then(() => {
               res.sendStatus(201);
          })
          .catch((err) => {
               console.error(err);
               res.status(500).json({message: 'Internal Server Error'});
          });

     }

     static async updateClient(req:any, res:any)
     {
          const { id } = req.params;
          const { name, email, phone, address } = req.body;


          if (!Types.ObjectId.isValid(id))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          const update:any = {};

          if (name && validateName(name))
          {
               update.name = name;
          }

          if (email && validateEmail(email))
          {
               update.email = email;
          }

          if (phone && validatePhone(phone))
          {
               update.phone = phone;
          }

          if (address && validateAddress(address))
          {
               update.address = address;
          }

          if (Object.keys(update).length === 0)
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          await Clients.updateOne({userid: req.session.userid, _id: id}, update)
          .then(() => {
               res.sendStatus(204);
          })
          .catch((err) => {
               console.error(err);
               res.status(500).json({message: 'Internal Server Error'});
          });

     }

     static deleteClient(req:any, res:any)
     {
          const { id } = req.params;

          if (!Types.ObjectId.isValid(id))
          {
               return res.status(400).json({message: 'Bad Request'});
          }

          Clients.deleteOne({userid: req.session.userid, _id: id})
          .then((result) => {
               if (result.deletedCount === 0) 
                    return res.status(404).json({message: 'Not Found'});

               return res.sendStatus(204);
          })
          .catch((err) => {
               console.error(err);
               return res.status(500).json({message: 'Internal Server Error'});
          });
     }
}