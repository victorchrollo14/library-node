import mongoose, { model } from "mongoose";

mongoose.set("strictQuery", false);

// creating a new schema
const Schema = mongoose.Schema;
const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, required: true },
  isRead: { type: Boolean, required: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// creating a model
const Books = mongoose.model("Books", bookSchema);

export { Books };
