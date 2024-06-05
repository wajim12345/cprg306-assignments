"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (event) => {
    event.preventDefault();
    let Item = {
      name,
      quantity,
      category,
    };

    alert(`Added: \nItem: ${name} \nQuantity: ${quantity} \nCategory: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <form className="border-8 border-blue-400 bg-black px-20 w-96 text-center m-auto">
      <div>
        <input
          className="text-black w-40 h-10 rounded mt-5"
          required
          type="text"
          placeholder="Item Name"
          onChange={handleName}
          value={name}
        ></input>
      </div>
      <div>
        <input
          className="text-black w-40 h-10 rounded my-5"
          required
          type="number"
          min={1}
          max={99}
          onChange={handleQuantity}
          value={quantity}
        ></input>
      </div>
      <div>
        <select
          className="text-black w-40 h-10 rounded mb-5"
          onChange={handleCategory}
          value={category}
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <button className="bg-purple-300 w-40 h-10 rounded mb-5" onClick={handleSubmit}>ADD!</button>
      </div>
    </form>
  );
}
