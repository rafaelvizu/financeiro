import MongoDB from "../db/MongoDB";

export default MongoDB.createModel("users", {
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     image_url: { type: String, required: false },
     created: { type: Date, required: true },
});