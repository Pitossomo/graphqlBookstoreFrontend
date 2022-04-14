import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../services/graphql";
import EditAuthor from "./EditAuthor";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  //if (!props.show) {
  if (result.loading) {
    return <p>Loading ...</p>;
  }
  console.log(result);

  const authors = result.data.allAuthors;
  console.log(authors);

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors} />
    </div>
  );
};

export default Authors;
