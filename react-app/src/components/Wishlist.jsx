import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishListRedux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCart, Delete, Favorite } from '@material-ui/icons';

const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const WishlistContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
`;

const WishlistItem = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    border-radius: 6px;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 120px;
  }
`;

const ItemInfo = styled.div`
  padding: 15px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

const ViewButton = styled(Button)`
  background-color: teal;
  color: white;
`;

const RemoveButton = styled(Button)`
  background-color: #000;
  color: white;
`;

const ContinueShoppingButton = styled(Button)`
  background-color: #000;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  margin: 20px auto;
  display: block;

  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;

  @media (max-width: 768px) {
    padding: 30px;
    font-size: 16px;
  }
`;

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleViewProduct = (item) => {
    navigate(`/product/${item._id}`);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <Container>
      <Title>My Wishlist <Favorite style={{ color: '#e91e63', verticalAlign: 'middle' }} /></Title>
      {wishlist.length > 0 ? (
        <WishlistContainer>
          {wishlist.map(item => (
            <WishlistItem key={item._id}>
              <ItemImage src={item.imageUrl} alt={item.title} />
              <ItemInfo>
                <ItemTitle>{item.title}</ItemTitle>
                <ButtonContainer>
                  <ViewButton onClick={() => handleViewProduct(item)}>
                    <ShoppingCart style={{ marginRight: '5px' }} />
                    View
                  </ViewButton>
                  <RemoveButton onClick={() => handleRemoveFromWishlist(item)}>
                    <Delete style={{ marginRight: '5px' }} />
                    Remove
                  </RemoveButton>
                </ButtonContainer>
              </ItemInfo>
            </WishlistItem>
          ))}
        </WishlistContainer>
      ) : (
        <EmptyWishlist>
          Your wishlist is empty. Start adding some items!
        </EmptyWishlist>
      )}
      <ContinueShoppingButton onClick={handleContinueShopping}>
        Continue Shopping
      </ContinueShoppingButton>
    </Container>
  );
};

export default Wishlist;