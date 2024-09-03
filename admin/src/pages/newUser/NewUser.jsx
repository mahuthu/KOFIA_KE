import "./newuser.css";
import { useState } from "react";
import { addUsers } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewUser() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addUsers(inputs, dispatch);
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>First Name</label>
          <input
            type="text"
            placeholder="John"
            name="firstName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            name="lastName"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            placeholder="john_doe"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+1 123 456 7890"
            name="phoneNumber"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Admin</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
