import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userRequest } from "../requestmethods";
import { clearCart } from '../redux/cartRedux';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.currentUser);
  const cart = location.state?.cart;

  // Move order creation logic to useCallback to memoize it
  const createOrder = useCallback(async () => {
    if (!cart || !user) {
      setError("Missing cart or user information");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Validate cart contents
      if (!cart.products || cart.products.length === 0) {
        throw new Error("Cart is empty");
      }

      const order = {
        user: user._id,
        orderItems: cart.products.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price,
          title: item.title
        })),
        amount: cart.total,
        shippingAddress: {
          address: "123 Street",
          city: "City",
          country: "Country"
        },
        paymentStatus: "completed"
      };

      console.log("Creating order:", order);
      
      const res = await userRequest.post("/orders", order);
      
      if (!res.data || !res.data._id) {
        throw new Error("Invalid response from server");
      }

      setOrderId(res.data._id);
      dispatch(clearCart());
      
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  }, [cart, user, dispatch]); // Include all dependencies

  // Effect to create the order
  useEffect(() => {
    // Only create the order if we haven't created one yet and we're not in an error state
    if (!orderId && !error) {
      createOrder();
    }
  }, [createOrder, orderId, error]);

  // Effect for error handling and redirect
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigate('/');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, navigate]);

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        Processing your order...
      </div>
    );
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      textAlign: "center"
    }}>
      {error ? (
        <div style={{ color: "red" }}>
          <p>{error}</p>
          <p>Redirecting to homepage...</p>
        </div>
      ) : (
        <>
          <h2 style={{ marginBottom: "20px" }}>
            {orderId
              ? `Order Created Successfully!`
              : `Processing Your Order...`}
          </h2>
          {orderId && (
            <p style={{ marginBottom: "20px" }}>
              Your order number is: <strong>{orderId}</strong>
            </p>
          )}
          <button 
            style={{ 
              padding: "10px 20px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }} 
            onClick={() => navigate("/")}
          >
            Go to Homepage
          </button>
        </>
      )}
    </div>
  );
};

export default Success;