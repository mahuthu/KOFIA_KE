import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.client.users || []); // Access client state

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  console.log("Fetched Users:", users); // Log fetched users

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isAdmin", headerName: "Admin", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 160, type: "date" },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  // Map users to include an id field
  const rows = users.map((user) => ({
    id: user._id, // Mapping _id to id
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin,
    createdAt: new Date(user.createdAt).toLocaleString(), // Format createdAt date
  }));

  console.log("DataGrid rows:", rows); // Log rows passed to DataGrid

  return (
    <div className="userList">
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
