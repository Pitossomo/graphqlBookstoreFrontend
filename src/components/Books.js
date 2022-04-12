import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`;

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  //if (!props.show) {
  if (result.loading) {
    return <p>Loading ...</p>;
  }

  const books = result.data.allBooks;
  console.log(books);

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;