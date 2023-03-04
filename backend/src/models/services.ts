import MongoDB from '../db/MongoDB'

export default MongoDB.createModel('services', {
     name: { type: String, required: true },
     description: { type: String, required: false }, 
     price: { type: Number, required: true },
     userid: { type: String, required: true },
     clientid: { type: String, required: true },
     created: { type: Date, required: true },
});