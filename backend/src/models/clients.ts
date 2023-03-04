import MongoDB from "../db/MongoDB";


export default MongoDB.createModel("clients", {
     name: { type: String, required: true },
     email: { type: String, required: false },
     phone: { type: String, required: false },
     address: { type: String, required: false },
     userid: { type: String, required: true },
});