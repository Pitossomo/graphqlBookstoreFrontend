import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../services/graphql";

const LoginForm = ({ setMessage, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage({ text: error.graphQLErrors[0].message, type: "error" });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
    }
  }, [result.data]); //eslint-disable-line

  const handleSubmit = async (event) => {
    event.preventDefault();
    login({
      variables: { username, password },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
