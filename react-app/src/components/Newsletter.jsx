import { Send } from "@material-ui/icons";
import React from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";

// Styled components
const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 20px; // Add padding for smaller screens
    ${mobile({ height: "auto", padding: "20px" })} // Adjust height and padding on small screens
`;

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
    ${mobile({ fontSize: "36px", textAlign: "center" })} // Adjust font size and alignment on small screens
`;

const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({ fontSize: "16px", textAlign: "center" })} // Adjust font size and alignment on small screens
`;

const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgray;
    ${mobile({ width: "100%", marginBottom: "20px" })} // Adjust width and margin on small screens
`;

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 20px;
    font-size: 16px; // Adjust font size for better readability
    ${mobile({ fontSize: "14px", paddingLeft: "10px" })} // Adjust font size and padding on small screens
`;

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
    font-size: 16px; // Adjust font size for better readability
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ fontSize: "14px" })} // Adjust font size on small screens
`;

const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely updates from your favorite products.</Description>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
