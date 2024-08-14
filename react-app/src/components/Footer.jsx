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
  flex-wrap: wrap; // Ensure items wrap properly
  ${mobile({ flexDirection: "column", padding: "20px" })} // Stack vertically and add padding on small screens
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  ${mobile({ width: "100%", padding: "10px" })} // Ensure full width and reduced padding on small screens
`;

const Logo = styled.h1`
  font-weight: bold;
  padding: 0 20px;
  ${mobile({ fontSize: "24px", padding: "0" })} // Adjust font size and padding on small screens
`;

const Desc = styled.p`
  margin: 20px 0;
  ${mobile({ fontSize: "14px" })} // Adjust font size on small screens
`;

const SocialContainer = styled.div`
  display: flex;
  ${mobile({ marginBottom: "20px" })} // Add margin for small screens
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
  ${mobile({ marginRight: "10px" })} // Adjust margin for small screens
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })} // Hide on small screens
`;

const Title = styled.h3`
  margin-bottom: 30px;
  ${mobile({ fontSize: "18px" })} // Adjust font size on small screens
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column", alignItems: "flex-start", padding: "0" })} // Stack items vertically on small screens
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  ${mobile({ width: "100%" })} // Full width on small screens
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8", width: "100%", padding: "10px" })} // Ensure full width and background color change on small screens
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px; // Adjust font size for better readability
`;

const Payment = styled.img`
  width: 50%;
  ${mobile({ width: "100%" })} // Full width on small screens
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>KOFIA_KE</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Fitted</ListItem>
          <ListItem>Adjustable</ListItem>
          <ListItem>Buckets</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
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
          <Phone style={{ marginRight: "10px" }} /> +254-726258462
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> KOFIA_KE.co.ke
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        <Desc>Designed by savannahinc</Desc>

      </Right>
    </Container>
  );
};

export default Footer;
