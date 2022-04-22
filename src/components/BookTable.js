import React from "react";

const BookTable = ({ books }) => (
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
);

export default BookTable;
