import DB from '../db';


export default DB.creteModel('category', {
     name: String,
     description: String,
     createAt: Date,
     updateAt: Date,
});