import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishListRedux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate hook


  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleViewProduct = (item) => {
    navigate(`/product/${item._id}`);  // Navigate to the product page
  };

//   const handleAddToCart = (item) => {
//     dispatch(addProduct({ ...item, quantity: 1 }));
//     dispatch(removeFromWishlist(item));
//   };

  return (
    <div>
      <h2>My Wishlist</h2>
      {wishlist.map(item => (
        <div key={item._id}>
          <img src={item.imageUrl} alt={item.title} />
          <h3>{item.title}</h3>
          <button onClick={() => handleViewProduct(item)}>View Product</button>  {/* Updated button */}
          <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;