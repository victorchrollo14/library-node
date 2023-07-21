import { Books } from "../models/bookModel.js";

const dataControllers = (() => {
  const getBooksData = async (req, res) => {
    try {
      const currentUser = req.session.user;
      const userId = currentUser._id;
      const result = await Books.find({ user: userId });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const addBookToLibrary = async (req, res) => {
    try {
      const currentUser = req.session.user;

      const newBook = new Books({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        isRead: req.body.isRead,
        user: currentUser._id,
      });

      await newBook.save();
      res.status(201).redirect("/");
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const removeBook = async (req, res) => {
    try {
      const id = req.params.id;
      await Books.findByIdAndDelete(id);

      res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  const updateBook = async (req, res) => {
    try {
      const id = req.params.id;
      let newRead = req.body.isRead;

      const doc = await Books.findById(id);
      doc.isRead = newRead;
      await doc.save();

      res.status(200).json({ message: "Read Status changed" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  return { getBooksData, addBookToLibrary, removeBook, updateBook };
})();

export { dataControllers };
