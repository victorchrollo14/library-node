import { Books } from "../models/bookModel.js";

const getBooksData = async (res) => {
  try {
    const result = await Books.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};

const addBookToLibrary = async ({ title, author, pages, read_status }) => {
  try {
    let isRead = read_status === "on" ? true : false;
    const newBook = new Books({
      title: title,
      author: author,
      pages: pages,
      isRead: isRead,
    });
    await newBook.save();
    console.log(`${title} by ${author} added to library`);
  } catch (error) {
    console.log(error);
  }
};

const removeBook = async ({ id }) => {
  try {
    const query = { _id: id };
    const result = await Books.deleteOne(query);
    console.log(`${result.deletedCount} document deleted from database`);
    return result.deletedCount;
  } catch (error) {
    console.log(error);
  }
};

export { getBooksData, addBookToLibrary, removeBook };
