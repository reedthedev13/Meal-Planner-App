import { useEffect, useState } from "react";
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

type MealsByDay = {
  [day: string]: string[]; // array of meal titles per day
};

const Planner = () => {
  const [meals, setMeals] = useState<MealsByDay>(() =>
    weekDays.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {} as MealsByDay)
  );

  const [addingForDay, setAddingForDay] = useState<string | null>(null);
  const [newMealTitle, setNewMealTitle] = useState("");

  useEffect(() => {
    document.title = "Meal Planner";
  }, []);

  const startAdding = (day: string) => {
    setAddingForDay(day);
    setNewMealTitle("");
  };

  const cancelAdding = () => {
    setAddingForDay(null);
    setNewMealTitle("");
  };

  const saveMeal = () => {
    if (!newMealTitle.trim()) return;
    if (!addingForDay) return;

    setMeals((prev) => ({
      ...prev,
      [addingForDay]: [...prev[addingForDay], newMealTitle.trim()],
    }));

    setAddingForDay(null);
    setNewMealTitle("");
  };

  const removeMeal = (day: string, index: number) => {
    setMeals((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 font-serif">
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

            {meals[day].length === 0 && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-300">
                No meals assigned yet.
              </div>
            )}

            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {meals[day].map((meal, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <span>{meal}</span>
                  <button
                    onClick={() => removeMeal(day, idx)}
                    className="text-xs text-red-500 hover:underline ml-2"
                    aria-label={`Remove meal ${meal} from ${day}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {addingForDay === day ? (
              <div className="mt-2 flex flex-col space-y-2">
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter meal name"
                  className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900  focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={newMealTitle}
                  onChange={(e) => setNewMealTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveMeal();
                    if (e.key === "Escape") cancelAdding();
                  }}
                />
                <div className="flex space-x-2">
                  <button
                    onClick={saveMeal}
                    className="flex-grow bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelAdding}
                    className="flex-grow bg-gray-400 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => startAdding(day)}
                className="text-sm text-blue-600 hover:underline mt-2"
              >
                + Add Recipe
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Planner;
