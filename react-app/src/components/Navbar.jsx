import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined, Person, Menu, Close } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/authActions';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: 'auto' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px', flexWrap: 'wrap' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 380px) {
    margin-right: 15px; // Add space between search and logo
  }
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  @media only screen and (max-width: 380px) {
    margin-left: 15px; // Reduce left margin on very small screens
  }
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  @media only screen and (max-width: 380px) {
    margin-left: 15px; // Add space on the left of the logo
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
  @media only screen and (max-width: 380px) {
    font-size: 20px; // Slightly smaller font on very small screens
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', marginTop: '10px' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const MenuIcon = styled(Menu)`
  display: none;
  ${mobile({ display: 'block', marginRight: '10px', cursor: 'pointer' })}
`;

const CloseIcon = styled(Close)`
  display: none;
  ${mobile({ display: 'block', marginRight: '10px', cursor: 'pointer' })}
`;

const MobileMenu = styled.div`
  display: none;
  ${mobile({
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    width: '100%',
    padding: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  })}
`;

const MobileMenuItem = styled(MenuItem)`
  ${mobile({
    margin: '10px 0',
    fontSize: '16px',
  })}
`;

const DesktopMenuItem = styled(MenuItem)`
  ${mobile({ display: 'none' })}
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const currentUser = useSelector(state => state.user.currentUser);
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          {mobileMenuOpen ? (
            <CloseIcon onClick={toggleMobileMenu} />
          ) : (
            <MenuIcon onClick={toggleMobileMenu} />
          )}
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center><Logo>KOFIA_KE</Logo></Center>
        <Right>
          <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {currentUser ? (
            <>
              <DesktopMenuItem onClick={handleLogout}>SIGN OUT</DesktopMenuItem>
              <DesktopMenuItem>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Person />
                </Link>
              </DesktopMenuItem>
              {wishlist.length > 0 && (
                <DesktopMenuItem>
                  <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Your Wishlist ({wishlist.length})
                  </Link>
                </DesktopMenuItem>
              )}
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <DesktopMenuItem>REGISTER</DesktopMenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <DesktopMenuItem>SIGN IN</DesktopMenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
      {mobileMenuOpen && (
        <MobileMenu>
          {currentUser ? (
            <>
              <MobileMenuItem onClick={handleLogout}>Sign Out</MobileMenuItem>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MobileMenuItem>
                  <Person />
                </MobileMenuItem>
              </Link>
              {wishlist.length > 0 && (
                <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MobileMenuItem>
                    Your Wishlist ({wishlist.length})
                  </MobileMenuItem>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MobileMenuItem>Register</MobileMenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <MobileMenuItem>Sign In</MobileMenuItem>
              </Link>
            </>
          )}
        </MobileMenu>
      )}
    </Container>
  );
};

export default Navbar;