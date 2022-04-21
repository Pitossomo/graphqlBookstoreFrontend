import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../services/graphql";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  console.log(result);

  //if (!props.show) {
  if (result.loading) {
    return <p>Loading ...</p>;
  }

  const books = result.data.allBooks;

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
