import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error } = useSelector((state) => state.user);



  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password }).then(() => {
      const currentUser = JSON.parse(localStorage.getItem("persist:root"))?.user?.currentUser;
      if (currentUser) {
        history.push('/'); // Redirect to the homepage after successful login
      }
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClick} disabled={isFetching} style={{ padding: 10, width:100 }}>
        Login
      </button>
      {error && <span>Something went wrong</span>}

    </div>
  );
};

export default Login;