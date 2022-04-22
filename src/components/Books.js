import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../services/graphql";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);

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

  console.log(filteredBooks);

  return (
    <div>
      <h2>books & MUCH MORE!</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
