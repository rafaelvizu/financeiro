import DB from '../db';

export default DB.creteModel('Services', {
     name: String,
     description: String,
     price: Number,
     createAt: Date
});
