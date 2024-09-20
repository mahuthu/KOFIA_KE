import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.imageUrl} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "countInStock", headerName: "Stock", width: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            {params.row.category.join(", ")}
          </div>
        );
      },
    },
    {
      field: "size",
      headerName: "Size",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.size.join(", ")}
          </div>
        );
      },
    },
    {
      field: "color",
      headerName: "Color",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.color.join(", ")}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product List</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}