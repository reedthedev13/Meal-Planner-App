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
      <div className="text-center space-y-3">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight google-sans-code" >
          🛒 Your Shopping List
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg google-sans-code tracking-tighter">
          Keep track of ingredients for your meals
        </p>
      </div>

      <ul className="space-y-3">
        {shoppingList.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <span className="text-gray-800 dark:text-white font-medium">
              {item.name}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Item name"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity (e.g., 2 lbs)"
            className="w-40 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
          <button
            onClick={addItem}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition font-semibold"
          >
            + Add
          </button>
        </div>
        {error && <p className="text-red-500 font-medium">{error}</p>}
      </div>

      <div className="text-center pt-4">
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition font-medium"
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default ShoppingList;
