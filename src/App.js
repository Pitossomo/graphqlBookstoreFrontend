import { useState } from "react";
import Authors from "./components/Authors";
import EditAuthor from "./components/EditAuthor";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const pagesToShow = {
    authors: <Authors show={page === "authors"} />,
    books: <Books show={page === "books"} />,
    addBook: <NewBook show={page === "addBook"} />,
    editAuthor: <EditAuthor show={page === "editAuthor"} />,
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("addBook")}>add book</button>
        <button onClick={() => setPage("editAuthor")}>edit author</button>
        {pagesToShow[page]}
      </div>
    </div>
  );
};

export default App;
