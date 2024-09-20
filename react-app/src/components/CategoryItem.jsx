import { styled } from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  background-color: #f5fbfd;
  overflow: hidden;
  ${mobile({
    flex: "0 0 calc(50% - 10px)", // Take up half the width minus margins
    height: "30vh", // Reduce height on mobile
    margin: "5px",
  })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fcf1ed;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3); // Add a semi-transparent overlay
`;

const Title = styled.h1`
  margin-bottom: 20px;
  ${mobile({
    fontSize: "1.2rem", // Smaller font size on mobile
  })}
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: teal;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: teal;
    color: white;
    transform: scale(1.05);
  }
  
  &:active {
    background-color: #006666;
    transform: scale(0.95);
  }

  ${mobile({
    padding: "5px 10px",
    fontSize: "0.8rem",
  })}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} alt={item.title} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
