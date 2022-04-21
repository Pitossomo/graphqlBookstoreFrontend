import { useApolloClient } from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setError] = useState(null);
  const client = useApolloClient();

  const pagesToShow = {
    authors: <Authors show={page === "authors"} />,
    books: <Books show={page === "books"} />,
    addBook: <NewBook show={page === "addBook"} />,
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={setError} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("addBook")}>add book</button>
        <button onClick={logout}>logout</button>
        {pagesToShow[page]}
      </div>
    </div>
  );
};

export default App;
