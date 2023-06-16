import { Books } from "../models/bookModel.js";

const getBooksData = async () => {
  try {
    const result = await Books.find();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export { getBooksData };
