import React from "react";
import { useState } from "react";

const color = {
  success: "forest",
  attention: "goldenrod",
  error: "tomato",
};

const Notify = ({ text, type = "attention" }) => {
  const [closed, setClosed] = useState(false);

  const style = {
    color: color[type],
    border: `1px solid ${color[type]}`,
  };

  const close = () => {
    setClosed(true);
  };

  return closed || !text ? null : (
    <div style={style}>
      <button onClick={close}>X</button>
      <p>{text}</p>
    </div>
  );
};

export default Notify;
