import React from 'react';
import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/cartRedux';
import { addToWishlist, removeFromWishlist } from '../redux/wishListRedux';
import { useSelector, useDispatch } from 'react-redux';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    min-width: calc(50% - 10px); // 50% width minus margins
    height: 250px; // Reduced height for smaller screens
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;

  @media (max-width: 768px) {
    height: 60%;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => (props.isWishlisted ? '#FF69B4' : 'white')};  // Red if wishlist
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${(props) => (props.isWishlisted ? '#ff9999' : '#e9f5f5')};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
`;

const Product = ({ item }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const wishlist = useSelector((state) => state.wishlist.items);
  
  const isWishlisted = wishlist.some((wishItem) => wishItem._id === item._id);

  const handleAddToCart = () => {
    dispatch(addProduct({ ...item, quantity: 1 }));
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(item));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.imageUrl} />
      <Info>
        {isAuthenticated && (
          <Icon onClick={handleAddToCart}>
            <ShoppingCartOutlined />
          </Icon>
        )}
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon onClick={handleToggleWishlist} isWishlisted={isWishlisted}>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
