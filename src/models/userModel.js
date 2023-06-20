import mongoose from "mongoose";

// const URI = "mongodb://localhost:27017/library";

// const connect = async () => {
//   try {
//     await mongoose.connect(URI);
//     console.log("connection established");
//   } catch (error) {
//     console.log(error);
//   }
// };

// connect().catch((err) => console.log(err));

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowecase: true, required: true },
  password: { type: String, required: true },
});

// creating a user collection
let User = mongoose.model("Users", userSchema);

// let newUser = new User({
//   name: "Victor",
//   email: "chrollolucilfer1402@gmail.com",
//   password: "botXerxes8732$$rand",
// });

// await newUser.save();
// console.log("User created");

export { User };
