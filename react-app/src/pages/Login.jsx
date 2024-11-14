import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { Link as RouterLink } from "react-router-dom"; // Import Link from react-router-dom

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
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ${mobile({ width: "90%", padding: "15px" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  ${mobile({ fontSize: "20px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  border-radius: 5px;
  font-size: 16px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(RouterLink)`
  margin: 5px 0;
  font-size: 14px;
  text-decoration: underline;
  color: teal;
  text-align: center;
  display: block;
  ${mobile({ fontSize: "12px" })}
`;

const Error = styled.span`
  color: red;
  text-align: center;
  display: block;
  margin-top: 10px;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
            placeholder="Username" 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <Input 
            placeholder="Password" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>{error}</Error>}
          <StyledLink to="#">DO YOU REMEMBER THE PASSWORD?</StyledLink>
          <StyledLink to="/register">CREATE A NEW ACCOUNT</StyledLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
