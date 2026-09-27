import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("Orders error:", error);
    } else {
      console.log("Orders:", data);
      setOrders(data);
    }
  }

  return (
    <div>
      <h1>📋 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="food-grid">
          {orders.map((order) => (
            <div className="food-card" key={order.id}>
              <h2>{order.food_name}</h2>

              <p>👤 {order.customer_name}</p>

              <p>📞 {order.phone}</p>

              <p>🔢 Quantity: {order.quantity}</p>

              <p>💰 Total: ₹{order.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;