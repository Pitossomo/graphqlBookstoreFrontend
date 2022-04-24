import { useState } from "react";
import BookTable from "./BookTable";

const Books = ({ result }) => {
  const [genreFilter, setGenreFilter] = useState(null);

  //if (!props.show) {
  if (result.loading) {
    return <p>Loading ...</p>;
  }

  const books = result.data.allBooks;
  let allGenres = [];
  books.forEach((book) => allGenres.push(...book.genres));

  const uniqueGenres = [...new Set(allGenres)];

  const filteredBooks = genreFilter
    ? books.filter((book) => book.genres.includes(genreFilter))
    : books;

  return (
    <div>
      <h2>books & MUCH MORE!</h2>

      <BookTable books={filteredBooks} />

      {uniqueGenres.map((genre) => (
        <button key={genre} onClick={(e) => setGenreFilter(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={(e) => setGenreFilter(null)}>clear Filter</button>
    </div>
  );
};

export default Books;
