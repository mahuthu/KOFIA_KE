import { styled } from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  position: relative;
  background-color: #f5fbfd;
  overflow: hidden; // Prevent overflow
  ${mobile({
    height: "auto", // Allow container height to adjust based on content
  })}
`;

const Image = styled.img`
  width: 100%;
  height: auto; // Ensure height adjusts to maintain aspect ratio
  ${mobile({
    maxHeight: "100%", // Prevent the image from exceeding container height
    objectFit: "cover", // Cover the container while preserving aspect ratio
  })}
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
  text-align: center; // Center text horizontally
  padding: 10px; // Add padding to avoid text being too close to edges
  box-sizing: border-box; // Ensure padding does not overflow container
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: teal;
  cursor: pointer;
  font-weight: 600;
  border-radius: 5px; // Rounded corners for better appearance
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
