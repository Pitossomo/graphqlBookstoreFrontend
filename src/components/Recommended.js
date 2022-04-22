import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../services/graphql";
import BookTable from "./BookTable";

const Recommended = (props) => {
  const booksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  //if (!props.show) {
  if (booksResult.loading || meResult.loading) {
    return <p>Loading ...</p>;
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return <BookTable books={books} />;
};

export default Recommended;
