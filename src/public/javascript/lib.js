let myLibrary = [];

const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const bookList = document.querySelector(".book-list");
const bookCard = document.querySelector(".book");

function showForm(e) {
  form.style.transform = "scale(1)";
}

function hideForm(e) {
  if (
    e.target !== newBookBtn &&
    e.target !== form &&
    e.target.parentElement !== form &&
    e.target.parentElement.parentElement !== form
  ) {
    form.style.transform = "scale(0)";
  }
}

const getData = (e) => {
  // prevent submit
  // e.preventDefault();

  let title,
    author,
    pages,
    readStatus = false,
    isRead;
  let userForm = document.querySelector("form");
  let data = new FormData(userForm);

  title = data.get("title");
  author = data.get("author");
  pages = data.get("pages");
  isRead = data.get("read-status");
  if (isRead === "on") {
    readStatus = true;
  }
  let objId = crypto.randomUUID();
  let newBook = new Books(objId, title, author, pages, readStatus);
  addBookToLibrary(newBook);

  form.style.transform = "scale(0)";
  userForm.reset();

  // postData(data);
};

// async function postData(formData) {
//   console.log(formData);
//   try {
//     const response = await fetch("/", { method: "POST", body: formData });
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }

const changeReadStatus = (e, id) => {
  myLibrary = myLibrary.map((book) => {
    if (book.id === id) {
      return { ...book, isRead: !book.isRead };
    }
    return book;
  });
  display(myLibrary);
};

const deleteBook = (e, id) => {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  console.log(myLibrary);

  display(myLibrary);
};

class Books {
  constructor(id, title, author, pages, isRead) {
    // the constructor...
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
  display(myLibrary);
}

function display(Library) {
  let bookSection, bkName, bkAuthor, bkPages, readBtn, removeBtn;
  // removing all the old data
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }

  // Adding new Data
  for (let book of Library) {
    bookSection = document.createElement("section");
    bkName = document.createElement("h1");
    bkAuthor = document.createElement("h1");
    bkPages = document.createElement("h2");
    readBtn = document.createElement("button");
    removeBtn = document.createElement("button");

    // adding classnames
    bookSection.classList.add("book");
    bookSection.setAttribute("data-id", book.id);
    bkName.classList.add("title");
    bkAuthor.classList.add("author");
    bkPages.classList.add("no-pages");
    readBtn.classList.add("read-unread", "read-btn");
    removeBtn.classList.add("rm-btn", "remove");

    // adding contentid
    bkName.textContent = `"${book.title}"`;
    bkAuthor.textContent = `- ${book.author}`;
    bkPages.textContent = `${book.pages} Pages`;
    removeBtn.textContent = "Remove";
    if (book.isRead) {
      readBtn.textContent = "Read";
    } else {
      readBtn.textContent = "UnRead";
    }

    // appending Childnodes
    bookSection.appendChild(bkName);
    bookSection.appendChild(bkAuthor);
    bookSection.appendChild(bkPages);
    bookSection.appendChild(readBtn);
    bookSection.appendChild(removeBtn);
    bookList.appendChild(bookSection);

    readBtn.addEventListener("click", (e) => {
      changeReadStatus(e, book.id);
    });

    removeBtn.addEventListener("click", (e) => {
      deleteBook(e, book.id);
    });
  }
}

// side navigation toggle logic
const listItems = document.querySelectorAll(".sidenav__item");

listItems.forEach((item) => {
  item.addEventListener("click", () => {
    listItems.forEach((item) => {
      item.classList.remove("active-item");
    });
    item.classList.add("active-item");
  });
});

// main execution
newBookBtn.addEventListener("click", showForm);
main.addEventListener("click", hideForm);

// document.addEventListener("submit", getData);

const url = "/get-data";
let booksArray;

async function fetchBooks() {
  try {
    const books = await fetch(url);
    booksArray = await books.json();
    for (let book of booksArray) {
      let { _id, title, author, pages, isRead } = book;
      let newBook = new Books(_id, title, author, pages, isRead);
      addBookToLibrary(newBook);
    }
  } catch (error) {
    console.log(error, "failed to fetch data");
  }
}

fetchBooks();
