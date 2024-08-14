import React from 'react';
import styled from 'styled-components';
import { Search } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authActions'; // Import the new logoutUser action
import { Link, useNavigate } from 'react-router-dom';
import { Person } from '@material-ui/icons'; // Add this import

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  align-items: center;
  color: #333; // Default color
  transition: color 0.3s ease, border-bottom 0.3s ease;
  
  &:hover {
    color: #555; // Hover color
    border-bottom: 2px solid #555; // Bottom border on hover
  }
  
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const ProfileIcon = styled(Person)`
  margin-right: 5px;
`;

const TopText = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: inherit;
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const currentUser = useSelector(state => state.user.currentUser);
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add this hook for navigation

  const handleLogout = () => {
    dispatch(logoutUser()); // Use the new logoutUser action
    navigate('/login'); // Use navigate instead of window.location.href
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Logo>KOFIA_KE</Logo></Center>
        <Right>
          {currentUser ? (
            <>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>
                  <ProfileIcon />
                  PROFILE
                </MenuItem>
              </Link>
              <MenuItem onClick={handleLogout}>SIGN OUT</MenuItem>
              <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          {wishlist.length > 0 && (
            <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>
                <TopText>Your Wishlist ({wishlist.length})</TopText>
              </MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
