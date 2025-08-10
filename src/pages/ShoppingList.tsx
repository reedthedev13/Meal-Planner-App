import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([
    { name: "Chicken Breast", quantity: "2 lbs" },
    { name: "Spaghetti Noodles", quantity: "1 box" },
    { name: "Tomato Sauce", quantity: "1 can" },
    { name: "Bell Peppers", quantity: "3" },
    { name: "Olive Oil", quantity: "2 tbsp" },
  ]);

  const [newName, setNewName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Shopping List";
  }, []);

  const addItem = () => {
    if (!newName.trim()) {
      setError("Item name is required.");
      return;
    }
    setShoppingList((prev) => [
      ...prev,
      { name: newName.trim(), quantity: newQuantity.trim() || "1" },
    ]);
    setNewName("");
    setNewQuantity("");
    setError("");
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-10 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center gap-2 p-4 bg-gradient-to-r from-[#0b1120] to-[#111827] rounded-xl shadow-lg border border-[#3d3d42]">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent google-sans-code">
          🛒 Your Shopping List
        </h2>
        <p className="text-gray-400 text-lg google-sans-code tracking-tight">
          Keep track of ingredients for your meals
        </p>
      </div>

      <ul className="space-y-3 mt-4">
        {shoppingList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#111827] to-[#1e293b] border border-[#3d3d42] shadow-md hover:shadow-lg transition"
          >
            <span className="text-gray-200 font-medium">{item.name}</span>
            <span className="text-sm text-gray-400">{item.quantity}</span>
          </li>
        ))}
      </ul>

      <div className="bg-gradient-to-br from-[#0b1120] to-[#1e293b] rounded-xl border border-[#3d3d42] shadow-md p-6 space-y-4 mt-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Item name"
            className="flex-1 rounded-lg border border-[#3d3d42] px-4 py-2 text-gray-100 bg-[#111827] placeholder-gray-500 focus:ring-2 focus:ring-[#ffb86b] focus:outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity (e.g., 2 lbs)"
            className="w-40 rounded-lg border border-[#3d3d42] px-4 py-2 text-gray-100 bg-[#111827] placeholder-gray-500 focus:ring-2 focus:ring-[#ffb86b] focus:outline-none"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <button
            onClick={addItem}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 px-5 py-2 rounded-lg transition font-semibold shadow-md"
          >
            + Add
          </button>
        </div>
        {error && <p className="text-red-500 font-medium">{error}</p>}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition font-medium shadow-md border border-gray-600"
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default ShoppingList;
