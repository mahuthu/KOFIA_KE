import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userRequest } from "../requestmethods";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);
  const user = useSelector(state => state.user.currentUser);
  const cart = location.state.cart;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const order = {
          user: user._id, // Updated to match the schema
          orderItems: cart.products.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          amount: cart.total,
          shippingAddress: {
            address: "123 Street", // Replace with actual shipping address
            city: "City",
            country: "Country"
          }
        };
        const res = await userRequest.post("/orders", order);
        setOrderId(res.data._id);
      } catch (err) {
        console.error("Error creating order:", err);
      }
    };

    if (cart && user) {
      createOrder();
    }
  }, [cart, user]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successful. Your order is being prepared...`}
        <button style={{ padding: 10, marginTop: 20 }} onClick={() => navigate("/")}>Go to Homepage</button>
    </div>
  );
}

export default Success;
