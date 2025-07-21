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

  const HomeButton = () => (
    <Link
      to="/"
      className="inline-block bg-blue-600 text-white px-2 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Home
    </Link>
  );

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white font-serif">
        Shopping List
      </h2>

      <ul className="space-y-3">
        {shoppingList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-xl shadow"
          >
            <span className="text-gray-800 dark:text-white">{item.name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 max-w-md">
        <input
          type="text"
          placeholder="Item name"
          className="flex-grow rounded-md border border-gray-300 dark:border-gray-600 px-1 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity (e.g., 2 lbs)"
          className="w-32 rounded-md border border-gray-300 dark:border-gray-600 px-1 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
        />
        <button
          onClick={addItem}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Add Item
        </button>
      </div>
      <HomeButton />

      {error && <p className="text-red-500 font-medium">{error}</p>}
    </motion.div>
  );
};

export default ShoppingList;
