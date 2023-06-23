import { server } from "./server.js";

let myLibrary = [];
let booksArray;

const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const bookList = document.querySelector(".book-list");
const bookCard = document.querySelector(".book");
const logoutBtn = document.querySelector(".logout");

// book Class
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

// forms functions
const submitBook = (e) => {
  // prevent submit
  e.preventDefault();

  let userForm = document.querySelector("form");
  let data = new FormData(userForm);
  let readStatus = false;

  const title = data.get("title");
  const author = data.get("author");
  const pages = data.get("pages");
  const isRead = data.get("read-status");
  console.log(isRead);

  if (isRead === "on") readStatus = true;

  if (isLoggedIn) server.addBook(title, author, pages, readStatus);

  let objId = crypto.randomUUID();
  let newBook = new Books(objId, title, author, pages, readStatus);
  addBookToLibrary(newBook);

  form.style.transform = "scale(0)";
  userForm.reset();
};

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

// books crud functions
function toggleRead(button) {
  if (button.innerText === "Read") {
    button.classList.remove("green-bg");
    button.classList.add("red-bg");
    return;
  }
  button.classList.remove("red-bg");
  button.classList.add("green-bg");
}

const changeReadStatus = async (e, id) => {
  try {
    let read_stat;
    myLibrary = myLibrary.map((book) => {
      if (book.id === id) {
        read_stat = !book.isRead;
        toggleRead(e.target);
        return { ...book, isRead: !book.isRead };
      }
      return book;
    });
    display(myLibrary);
    if (isLoggedIn) {
      server.changeReadStatus(read_stat, id);
    }
  } catch (error) {
    alert(error, " try again after some time");
  }
};

const deleteBook = async (e, id) => {
  try {
    myLibrary = myLibrary.filter((book) => book.id !== id);

    if (isLoggedIn) {
      server.deleteBook(id);
    }

    display(myLibrary);
  } catch (error) {
    alert(`${error}, \n Try again after some time`);
  }
};

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
      readBtn.classList.add("green-bg");
    } else {
      readBtn.textContent = "Not Read";
      readBtn.classList.add("red-bg");
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
const sideNavToggle = (() => {
  const listItems = document.querySelectorAll(".sidenav__item");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      listItems.forEach((item) => {
        item.classList.remove("active-item");
      });
      item.classList.add("active-item");
    });
  });
})();

// main execution
newBookBtn.addEventListener("click", showForm);
main.addEventListener("click", hideForm);
form.addEventListener("submit", submitBook);
if (logoutBtn) {
  logoutBtn.addEventListener("click", server.logout);
}

const isLoggedIn = await server.checkLogin();
console.log(isLoggedIn);
if (isLoggedIn) {
  booksArray = await server.fetchBooks();
  for (let book of booksArray) {
    let { _id, title, author, pages, isRead } = book;
    let newBook = new Books(_id, title, author, pages, isRead);
    addBookToLibrary(newBook);
  }
}

export { display, myLibrary, Books };
