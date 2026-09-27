import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFood();
  }, [id]);

  async function getFood() {
    const { data, error } = await supabase
      .from("foods")
      .select("*");

    if (error) {
      console.log(error);
      alert("Could not load food");
      setLoading(false);
      return;
    }

    const selectedFood = data.find(
      (item) => String(item.id) === String(id)
    );

    setFood(selectedFood);
    setLoading(false);
  }

  async function placeOrder() {
    if (customerName === "" || phone === "") {
      alert("Please enter your name and phone number");
      return;
    }

    const totalPrice = food.price * quantity;

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          food_name: food.name,
          price: totalPrice,
          customer_name: customerName,
          phone: phone,
          quantity: quantity
        }
      ]);

    if (error) {
      console.log(error);
      alert("Order failed");
    } else {
      alert("Order placed successfully!");
      navigate("/orders");
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!food) {
    return (
      <div>
        <h2>Food not found</h2>
        <button onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1>Place Your Order</h1>

      <h2>{food.name}</h2>

      <p>Category: {food.category}</p>

      <p>Price: ₹{food.price}</p>

      <div className="order-form">
        <label>Your Name</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Phone Number</label>

        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Quantity</label>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <h3>
          Total Price: ₹{food.price * quantity}
        </h3>

        <button onClick={placeOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Order;