import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Add, Remove } from "@material-ui/icons";

import axios from 'axios';

// Redux actions
import { updateProductQuantity, clearCart } from '../redux/cartRedux';

// Components
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  padding: 2rem;
  flex: 1;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ActionButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.primary ? `
    background-color: #000;
    color: white;
    border: none;
    
    &:hover {
      background-color: #333;
    }
  ` : `
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
    
    &:hover {
      background-color: #f5f5f5;
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CartStats = styled.div`
  display: flex;
  gap: 1rem;
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainSection = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProductTitle = styled.h3`
  font-weight: 500;
  margin: 0;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const ColorCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid #ddd;
  display: inline-block;
  margin-right: 5px;
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Summary = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  margin-bottom: 1.5rem;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? '600' : '400'};
`;

// Modal Components
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const PaymentOption = styled.div`
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#000' : '#ddd'};
  border-radius: 6px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #000;
  }
  
  h3 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
    
    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const PhoneInput = styled.input`
  width: 80%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const EmptyCartMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Cart = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('registered');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  
  const cart = useSelector(state => state.cart);
  const wishlist = useSelector(state => state.wishlist);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, type) => {
    const product = cart.products.find(p => p._id === productId);
    let newQuantity = product.quantity;
    
    if (type === "decrease") {
      newQuantity = Math.max(1, product.quantity - 1);
    } else {
      newQuantity = product.quantity + 1;
    }
    
    dispatch(updateProductQuantity({ id: productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(clearCart(productId));
  };

  const initiateCheckout = () => {
    if (cart.quantity === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    const amount = 1  //cart.total;
    let phoneToUse;

    if (paymentPhone === 'registered') {
      const localPhoneNumber = currentUser?.phoneNumber;
      phoneToUse = `254${localPhoneNumber.slice(1)}`;
    } else {
      if (!newPhoneNumber || newPhoneNumber.length < 10) {
        alert("Please enter a valid phone number");
        return;
      }
      phoneToUse = `254${newPhoneNumber.slice(1)}`;
    }

    try {
      const response = await axios.post(
        "https;//kofia.co.ke/api/authentication/stkpush", 
        { phone: phoneToUse, amount }
      );
      
      console.log("Payment initiated:", response.data);
      alert("Please check your phone for the payment prompt");
      setShowPaymentModal(false);
      navigate(`/success`, { state: { cart: cart } });
      console.log(cart);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <Announcement />
      
      <MainContent>
        <PageTitle>Your Shopping Cart</PageTitle>
        
        <TopSection>
          <ActionButton onClick={() => navigate('/')}>
            Continue Shopping
          </ActionButton>
          
          <CartStats>
            <Link to="/cart">Cart Items ({cart.quantity})</Link>
            <Link to="/wishlist">Wishlist ({wishlist.items.length})</Link>
          </CartStats>
          
          <ActionButton 
            primary 
            disabled={cart.quantity === 0}
            onClick={initiateCheckout}
          >
            Checkout Now
          </ActionButton>
        </TopSection>

        <MainSection>
          <CartItems>
            {cart.products.length > 0 ? (
              cart.products.map((product) => (
                <CartItem key={product._id}>
                  <ProductImage src={product.imageUrl} alt={product.title} />
                  
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductInfo>
                      <span>ID: {product._id}</span>
                      <span>Size: {product.size}</span>
                      <ColorContainer>
                        {product.color ? (
                          <ColorCircle color={product.color} />
                        ) : (
                          product.colors && product.colors.map((color, index) => (
                            <ColorCircle key={index} color={color} />
                          ))
                        )}
                      </ColorContainer>
                    </ProductInfo>
                    
                    <QuantityControls>
                      <Remove 
                        onClick={() => handleQuantityChange(product._id, "decrease")}
                        style={{ cursor: 'pointer' }}
                      />
                      <span>{product.quantity}</span>
                      <Add 
                        onClick={() => handleQuantityChange(product._id, "increase")}
                        style={{ cursor: 'pointer' }}
                      />
                    </QuantityControls>
                    
                    <ActionButton onClick={() => handleRemoveItem(product._id)}>
                      Remove
                    </ActionButton>
                  </ProductDetails>
                  
                  <div>
                    <strong>KSH {product.price * product.quantity}</strong>
                  </div>
                </CartItem>
              ))
            ) : (
              <EmptyCartMessage>
                <h3>Your cart is empty</h3>
                <p>Add some items to get started!</p>
              </EmptyCartMessage>
            )}
          </CartItems>

          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <span>Subtotal</span>
              <span>KSH {cart.total}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Shipping</span>
              <span>KSH 0</span>
            </SummaryItem>
            <SummaryItem>
              <span>Discount</span>
              <span>KSH 0</span>
            </SummaryItem>
            <SummaryItem total>
              <span>Total</span>
              <span>KSH {cart.total}</span>
            </SummaryItem>
            
            <ActionButton 
              primary 
              disabled={cart.quantity === 0}
              onClick={initiateCheckout}
            >
              Proceed to Checkout
            </ActionButton>
          </Summary>
        </MainSection>
      </MainContent>

      {showPaymentModal && (
        <Modal>
          <ModalContent>
            <ModalTitle>Choose Payment Phone Number</ModalTitle>
            
            <PaymentOption
              selected={paymentPhone === 'registered'}
              onClick={() => setPaymentPhone('registered')}
            >
              <h3>Use Registered Number</h3>
              <p>{currentUser?.phoneNumber}</p>
            </PaymentOption>
            
            <PaymentOption
              selected={paymentPhone === 'new'}
              onClick={() => setPaymentPhone('new')}
            >
              <h3>Use Different Number</h3>
              {paymentPhone === 'new' && (
                <PhoneInput
                  type="tel"
                  placeholder="Enter phone number (e.g., 0712345678)"
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
              )}
            </PaymentOption>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <ActionButton onClick={() => setShowPaymentModal(false)}>
                Cancel
              </ActionButton>
              <ActionButton primary onClick={handlePayment}>
                Proceed to Pay
              </ActionButton>
            </div>
          </ModalContent>
        </Modal>
      )}
      
      <Footer />
    </PageContainer>
  );
};

export default Cart;