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
    const newBook = new Books({
      title: title,
      author: author,
      pages: pages,
      isRead: read_status,
    });
    await newBook.save();
    console.log(`${title} by ${author} added to library`);
  } catch (error) {
    console.log(error);
  }
};

export { getBooksData, addBookToLibrary };
