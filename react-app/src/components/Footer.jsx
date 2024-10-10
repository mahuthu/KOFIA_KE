import React from 'react';
import styled from 'styled-components';
import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
} from "@material-ui/icons";
import { mobile } from "../responsive";

// Styled components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: teal;
  color: white;
  ${mobile({ flexDirection: "column" })} // Stack vertically and add padding on small screens
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ alignItems: "center" })} // Center content on small screens
`;

const Logo = styled.h1`
  margin-bottom: 20px;
  color: #000
`;

const Desc = styled.p`
  margin-bottom: 20px;
  color: #fff;
  ${mobile({ textAlign: "center" })} // Center text on small screens
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })} // Hide on small screens
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#008080" })} // Adjust background color on small screens
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
  ${mobile({ width: "80%" })} // Increase width on small screens
`;

const DesignerLink = styled.div`
  flex-basis: 100%;
  text-align: center;
  padding: 10px;
  background-color: #006666;
`;

const StyledLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>KOFIA_KE</Logo>
        <Desc>
          The No 1 Online Authentic Headwear Shop in Kenya.
        </Desc>
        <SocialContainer>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
          </a>
          <a href="https://x.com/KOFIA_KE" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </a>
        </SocialContainer>
      </Left>
      
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Fitted</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Buckets</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Adjustable</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Nairobi, Kenya
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +254-793-704-217
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> info@kofia.co.ke
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>

      <DesignerLink>
        <StyledLink href="https://savannahinc.co.ke" target="_blank" rel="noopener noreferrer">
        © 2024 Savannah Inc, All Rights Reserved.
        </StyledLink>
      </DesignerLink>
    </Container>
  );
};

export default Footer;
