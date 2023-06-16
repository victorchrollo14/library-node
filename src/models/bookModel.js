import mongoose, { model } from "mongoose";

mongoose.set("strictQuery", false);
const URI = "mongodb://localhost:27017/library";

const connect = async () => {
  await mongoose.connect(URI);
  console.log("connection established");
};

connect().catch((err) => console.log(err));

// creating a new schema
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  isRead: { type: Boolean, required: false },
});

// creating a model
const Books = mongoose.model("Books", bookSchema);

// Add books
// const rudest = new Books({
//   title: "rudest book ever",
//   author: "Swetabh gangwar",
//   pages: "136",
//   isRead: true,
// });

// await rudest.save();
// console.log("book saved");

// find books
// const query = { title: { $regex: "rudest" } };
// const result = await Books.find(query);
// console.log(result);

export { Books };
