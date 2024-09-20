import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);
  const [expandedUser, setExpandedUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    getUsers();
  }, []);
  
  const toggleUserDetails = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            <button 
              className="widgetSmButton"
              onClick={() => toggleUserDetails(user._id)}
            >
              <Visibility className="widgetSmIcon" />
              Display
            </button>
            {expandedUser === user._id && (
              <div className="widgetSmUserDetails">
                <p><strong>First Name:</strong> {user.firstName || "N/A"}</p>
                <p><strong>Last Name:</strong> {user.lastName || "N/A"}</p>
                <p><strong>Phone Number:</strong> {user.phoneNumber || "N/A"}</p>
                <p><strong>Is Admin:</strong> {user.isAdmin ? "Yes" : "No"}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}