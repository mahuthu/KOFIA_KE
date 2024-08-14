import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFhakrAVnq1QmaYU6nyyOxejOy0N7unAeCA&usqp=CAU")
      center;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ backgroundPosition: 'top center' })}
`;

const Wrapper = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${mobile({ padding: "15px" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
  ${mobile({ fontSize: "20px", marginBottom: "10px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  ${mobile({ fontSize: "12px" })}
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 10px 0;
  text-align: center;
  ${mobile({ fontSize: "11px" })}
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 12px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (inputs.password !== inputs.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Data being sent:", {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      phoneNumber: inputs.phoneNumber,
      firstName: inputs.firstName,
      lastName: inputs.lastName
    });

    // Call register function
    register(dispatch, {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
      phoneNumber: inputs.phoneNumber,
      firstName: inputs.firstName,
      lastName: inputs.lastName
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Input name="firstName" placeholder="First Name" onChange={handleChange} />
            <Input name="lastName" placeholder="Last Name" onChange={handleChange} />
          </Row>
          <Row>
            <Input name="username" placeholder="Username" onChange={handleChange} />
            <Input name="email" placeholder="Email" onChange={handleChange} />
          </Row>
          <Row>
            <Input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
          </Row>
          <Input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
