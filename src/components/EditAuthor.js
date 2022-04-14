import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from "../services/graphql";

const EditAuthor = (props) => {
  const [name, setName] = useState("");
  const [bornTo, setBornTo] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: name, setBornTo: Number(bornTo) },
    });

    setName("");
    setBornTo("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          born to
          <input value={bornTo} onChange={(e) => setBornTo(e.target.value)} />
        </div>
        <button type="submit">edit author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
