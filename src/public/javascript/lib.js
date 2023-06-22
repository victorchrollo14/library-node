let myLibrary = [];
let booksArray;

const url = "/get-data";
const newBookBtn = document.querySelector(".new-book");
const form = document.querySelector(".form");
const main = document.querySelector(".main");
const bookList = document.querySelector(".book-list");
const bookCard = document.querySelector(".book");
const logoutBtn = document.querySelector(".logout");

async function logout(e) {
  const response = await fetch("/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "applications/json",
    },
  });
  const data = await response.json();
  alert(`${data.name} logged out successfully`);
 
}

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

    // handling update request
    let response = await fetch(`/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ isRead: read_stat }),
    });
    let data = await response.json();

    if (data.message) {
      display(myLibrary);
    }
  } catch (error) {
    alert(error, " try again after some time");
  }
};

const deleteBook = async (e, id) => {
  try {
    myLibrary = myLibrary.filter((book) => book.id !== id);
    let result = await fetch(`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    alert(data.message);
    display(myLibrary);
  } catch (error) {
    alert(`${error}, \n Try again after some time`);
  }
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
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

fetchBooks();
