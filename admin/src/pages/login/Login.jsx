import { useState, useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { login } from "../../redux/apiCalls";
import { clearError } from "../../redux/userRedux"; // Import clearError from your userSlice


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct hook
  const { isFetching, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearError()); // Clear the error when the component mounts
  }, [dispatch]);


  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
    const currentUser = JSON.parse(localStorage.getItem("persist:root"))?.user;
    if (currentUser && JSON.parse(currentUser).currentUser) {
      navigate("/");
    }
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
      <button onClick={handleClick} disabled={isFetching} style={{ padding: 10, width: 100 }}>
        Login
      </button>
      {error && <span style={{ color: "red", marginTop: 10 }}>Something went wrong!</span>}
    </div>
  );
};

export default Login;
