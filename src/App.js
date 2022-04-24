import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";
import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import Recommended from "./components/Recommended";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from "./services/graphql";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState({ text: "", type: null }); // type: succes or error or attention
  const client = useApolloClient();

  const allBooksResult = useQuery(ALL_BOOKS);
  const allAuthorsResult = useQuery(ALL_AUTHORS);
  const meResult = useQuery(ME);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      setMessage({ text: `book ${addedBook.title} added`, type: "success" });

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(addedBook) };
      });
    },
  });

  const pagesToShow = {
    authors: <Authors result={allAuthorsResult} show={page === "authors"} />,
    books: <Books result={allBooksResult} show={page === "books"} />,
    addBook: <NewBook show={page === "addBook"} />,
    recommended: (
      <Recommended
        booksResult={allBooksResult}
        meResult={meResult}
        show={page === "recommended"}
      />
    ),
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify {...message} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setMessage={setMessage} />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("addBook")}>add book</button>
        <button onClick={() => setPage("recommended")}>recommended</button>
        <button onClick={logout}>logout</button>
        {pagesToShow[page]}
      </div>
    </div>
  );
};

export default App;
