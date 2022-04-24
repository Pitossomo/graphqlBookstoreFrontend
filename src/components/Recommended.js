import BookTable from "./BookTable";

const Recommended = ({ booksResult, meResult }) => {
  //if (!props.show) {
  if (booksResult.loading || meResult.loading) {
    return <p>Loading ...</p>;
  }

  console.log(meResult.data.me);
  const favoriteGenre = meResult.data.me.favoriteGenre;
  const books = booksResult.data.allBooks.filter((b) =>
    b.genres.includes(favoriteGenre)
  );

  return <BookTable books={books} />;
};

export default Recommended;
