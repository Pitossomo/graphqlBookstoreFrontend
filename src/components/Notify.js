import React from "react";
import { useState } from "react";

const errorStyle = {
  color: "red",
  border: "1px solid red",
};

const Notify = ({ errorMessage }) => {
  const [closed, setClosed] = useState(false);

  const close = () => {
    setClosed(true);
  };

  return closed || !errorMessage ? null : (
    <div style={errorStyle}>
      <button onClick={close}>X</button>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Notify;
