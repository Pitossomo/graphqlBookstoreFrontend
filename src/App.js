import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const [page, setPage] = useState("authors");

  const pagesToShow = {
    authors: <Authors show={page === "authors"} />,
    books: <Books show={page === "books"} />,
    add: <NewBook show={page === "add"} />,
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>

        {pagesToShow[page]}
      </div>
    </div>
  );
};

export default App;
