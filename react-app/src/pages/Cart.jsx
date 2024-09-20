import React from 'react';
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { updateProductQuantity, clearCart } from "../redux/cartRedux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : "1px solid black"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" ? "white" : "black"};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "#333" : "#f8f8f8"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #ddd;
  display: inline-block;
  margin-left: 5px;
  ${mobile({ marginBottom: "10px" })}
`;

const ProductSize = styled.span`
  ${mobile({ marginBottom: "10px" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCheckout = async () => {
    if (cart.quantity === 0) {
      alert("Your cart is empty. Add some items before checking out.");
      return;
    }
    const amount = cart.total;
    const localPhoneNumber = currentUser?.phoneNumber;
    const phone = `254${localPhoneNumber.slice(1)}`;

    try {
      const response = await axios.post("http://localhost:5000/api/authentication/stkpush", { phone, amount });
      console.log("STK Push Response:", response.data);
      alert("STK Push initiated. Check your phone for the prompt.");
      console.log("Cart:", cart);
      navigate(`/success`, { state: { cart: cart } });
    } catch (error) {
      console.error("STK Push Error:", error.message);
      alert("Failed to initiate STK Push.");
    }
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleQuantityChange = (productId, type) => {
    const product = cart.products.find(p => p._id === productId);
    let newQuantity = product.quantity;
    if (type === "dec") {
      newQuantity = Math.max(1, product.quantity - 1);
    } else if (type === "inc") {
      newQuantity = product.quantity + 1;
    }
    dispatch(updateProductQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleRemoveProduct = (productId) => {
    dispatch(clearCart(productId));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={handleContinueShopping}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
              <TopText>Shopping Bag({cart.quantity})</TopText>
            </Link>
            <Link to="/wishlist" style={{ textDecoration: 'none', color: 'inherit' }}>
              <TopText>Your Wishlist({wishlist.items.length})</TopText>
            </Link>
          </TopTexts>
          <TopButton type="filled" onClick={handleCheckout} disabled={cart.quantity === 0}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.length > 0 ? (
              cart.products.map((product) => (
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.imageUrl} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <div>
                        <b>Color:</b>
                        <ProductColor color={product.color} />
                      </div>
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove onClick={() => handleQuantityChange(product._id, "dec")} style={{ cursor: 'pointer' }} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add onClick={() => handleQuantityChange(product._id, "inc")} style={{ cursor: 'pointer' }} />
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                    <RemoveButton onClick={() => handleRemoveProduct(product._id)}>
                      Remove
                    </RemoveButton>
                  </PriceDetail>
                </Product>
              ))
            ) : (
              <EmptyCartMessage>Your cart is empty. Add some items to get started!</EmptyCartMessage>
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleCheckout} disabled={cart.quantity === 0}>
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;