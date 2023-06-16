let myLibrary = [];
let readButtons = [];
let removeButtons = [];

const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const bookList = document.querySelector(".book-list");
const bookCard = document.querySelector(".book");
let objId = 0;

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
  e.preventDefault();

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

  let newBook = new Books(objId, title, author, pages, readStatus);
  addBookToLibrary(newBook);

  form.style.transform = "scale(0)";
  userForm.reset();
  objId++;
};

const changeReadStatus = (e) => {
  let parent = e.target.parentElement;
  let bookId = parent.getAttribute("data-id");

  for (let obj of myLibrary) {
    if (obj.id === Number(bookId)) {
      if (obj.isRead === true) {
        obj.isRead = false;
        break;
      }
      obj.isRead = true;
    }
  }
  display(myLibrary);
};

const deleteBook = (e) => {
  let parent = e.target.parentElement;
  let bookId = parent.getAttribute("data-id");

  for (let obj of myLibrary) {
    if (obj.id === Number(bookId)) {
      myLibrary.splice(obj.id, 1);
      myLibrary.forEach((ob, i) => {
        console.log(i);
        ob.id = i;
      });
    }
  }
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
  let id = 0;

  // removing all the old data
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild);
  }
  removeButtons = [];
  readButtons = [];

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
    bookSection.setAttribute("data-id", id);
    bkName.classList.add("title");
    bkAuthor.classList.add("author");
    bkPages.classList.add("no-pages");
    readBtn.classList.add("read-unread", "read-btn");
    removeBtn.classList.add("rm-btn", "remove");

    // adding content
    bkName.textContent = `"${book.title}"`;
    bkAuthor.textContent = book.author;
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

    // pushing the buttons of newly created books into a list
    // and adding eventListeners to the buttons
    readButtons.push(readBtn);
    readButtons.forEach((readBtn) => {
      readBtn.addEventListener("click", changeReadStatus);
    });

    if (removeButtons.includes(removeBtn)) {
      console.log("is present");
      return;
    }
    removeButtons.push(removeBtn);
    console.log(removeButtons);

    removeButtons.forEach((removeBtn) => {
      removeBtn.addEventListener("click", deleteBook);
    });
    id++;
  }
}

// main execution
newBookBtn.addEventListener("click", showForm);
main.addEventListener("click", hideForm);

document.addEventListener("submit", getData);
