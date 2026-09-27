import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";

function Menu() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    getFoods();
  }, []);

  async function getFoods() {
    const { data, error } = await supabase
      .from("foods")
      .select("*");

    if (error) {
      console.log("Foods error:", error);
    } else {
      console.log("Foods:", data);
      setFoods(data);
    }
  }

  return (
    <div>
      <h1>🍔 Our Menu</h1>

      <div className="food-grid">
        {foods.map((food) => (
          <div className="food-card" key={food.id}>
            <h2>{food.name}</h2>

            <p>🍴 {food.category}</p>

            <p>💰 ₹{food.price}</p>

            <Link to={`/order/${food.id}`}>
              <button>Order Now</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;