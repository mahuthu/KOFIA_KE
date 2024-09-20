import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import { format } from "timeago.js";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);

        // Collect unique user IDs
        const userIds = new Set(res.data.map(order => order.user));

        // Fetch users
        const usersRes = await userRequest.get(`users?userIds=${Array.from(userIds).join(',')}`);
        const usersMap = {};
        usersRes.data.forEach(user => {
          usersMap[user._id] = user;
        });
        setUsers(usersMap);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    getOrders();
  }, []);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Order Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{users[order.user]?.username || "N/A"}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
              <td className="widgetLgOrderItems">
                {order.orderItems.map((item, index) => (
                  <div key={index}>
                    Product ID: {item.product} (x{item.quantity})
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}