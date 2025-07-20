import { useEffect } from "react";
import { motion } from "framer-motion";

const dummyShoppingList = [
  { name: "Chicken Breast", quantity: "2 lbs" },
  { name: "Spaghetti Noodles", quantity: "1 box" },
  { name: "Tomato Sauce", quantity: "1 can" },
  { name: "Bell Peppers", quantity: "3" },
  { name: "Olive Oil", quantity: "2 tbsp" },
];

const ShoppingList = () => {
  useEffect(() => {
    document.title = "Shopping List";
  }, []);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Shopping List
      </h2>

      <ul className="space-y-3">
        {dummyShoppingList.map((item, index) => (
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

      <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700">
        Generate from Meal Plan
      </button>
    </motion.div>
  );
};

export default ShoppingList;
