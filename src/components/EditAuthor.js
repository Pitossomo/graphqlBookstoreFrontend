import { useMutation } from "@apollo/client";
import { useState } from "react";
import { EDIT_AUTHOR_BORN, ALL_AUTHORS } from "../services/graphql";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const EditAuthor = (props) => {
  const [name, setName] = useState("");
  const [bornTo, setBornTo] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const animatedComponents = makeAnimated();

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: name, setBornTo: Number(bornTo) },
    });

    setBornTo("");
  };

  const options = props.authors.map((a) => {
    return { value: a.name, label: a.name };
  });

  const handleNameChange = (selectedOption) => {
    setName(selectedOption.value);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            onChange={handleNameChange}
            options={options}
            components={animatedComponents}
          />
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
