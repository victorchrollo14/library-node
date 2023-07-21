import { display, myLibrary } from "./lib.js";

const server = (() => {
  async function fetchBooks() {
    try {
      const url = "/get-data";
      const books = await fetch(url);
      const booksArray = await books.json();
      return booksArray;
    } catch (error) {
    }
  }

  const deleteBook = async (id) => {
    let result = await fetch(`/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await result.json();
    alert(data.message);
  };

  const changeReadStatus = async (read_stat, id) => {
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
  };

  const addBook = async (title, author, pages, readStatus) => {
    await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        pages: pages,
        isRead: readStatus,
      }),
    });
  };

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

  const checkLogin = async () => {
    try {
      const response = await fetch("/user/check-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) alert(data.error);
  
      if (data.login) {
        return data.login;
      }
      return false;
    } catch (error) {
      alert(error);
    }
  };

  return { fetchBooks, changeReadStatus, deleteBook, addBook, logout, checkLogin };
})();

export { server };
