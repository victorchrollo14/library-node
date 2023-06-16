import { Books } from "../models/bookModel.js";

const getBooksData = async (res) => {
  try {
    const result = await Books.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

export { getBooksData };
