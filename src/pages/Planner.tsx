import { useEffect } from "react";
import { motion } from "framer-motion";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Planner = () => {
  useEffect(() => {
    document.title = "Meal Planner";
  }, []);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Weekly Meal Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 space-y-2"
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              {day}
            </h3>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-300">
              No meals assigned yet.
            </div>
            <button className="text-sm text-blue-600 hover:underline">
              + Add Recipe
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Planner;
