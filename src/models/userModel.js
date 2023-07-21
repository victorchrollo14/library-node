import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowecase: true, required: true },
  password: { type: String, required: true },
});

// creating a user collection
let User = mongoose.model("Users", userSchema);

export { User };
