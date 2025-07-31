import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Meal = {
  title: string;
  calories: number;
  protein: number;
  ingredients: string[];
};

type MealsByDay = {
  [day: string]: Meal[];
};

const Planner = () => {
  const [meals, setMeals] = useState<MealsByDay>(() =>
    weekDays.reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {} as MealsByDay)
  );

  const [addingForDay, setAddingForDay] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    calories: "",
    protein: "",
    ingredients: "",
  });

  useEffect(() => {
    document.title = "Meal Planner";
  }, []);

  const startAdding = (day: string) => {
    setAddingForDay(day);
    setForm({ title: "", calories: "", protein: "", ingredients: "" });
  };

  const cancelAdding = () => {
    setAddingForDay(null);
    setForm({ title: "", calories: "", protein: "", ingredients: "" });
  };

  const saveMeal = () => {
    if (!addingForDay || !form.title.trim()) return;

    const newMeal: Meal = {
      title: form.title.trim(),
      calories: Number(form.calories),
      protein: Number(form.protein),
      ingredients: form.ingredients
        .split(",")
        .map((ing) => ing.trim())
        .filter(Boolean),
    };

    setMeals((prev) => ({
      ...prev,
      [addingForDay]: [...prev[addingForDay], newMeal],
    }));

    cancelAdding();
  };

  const removeMeal = (day: string, index: number) => {
    setMeals((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-extrabold text-white google-sans-code">Meal Planner</h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Home
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-5 space-y-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {day}
            </h3>

            {meals[day].length === 0 && (
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                No meals assigned yet.
              </div>
            )}

            <ul className="space-y-3">
              {meals[day].map((meal, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {meal.title}
                    </span>
                    <button
                      onClick={() => removeMeal(day, idx)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-sm mt-1 text-gray-700 dark:text-gray-300">
                    Calories: {meal.calories} | Protein: {meal.protein}g
                  </div>
                  <div className="text-xs mt-1 italic text-gray-500 dark:text-gray-400">
                    Ingredients: {meal.ingredients.join(", ")}
                  </div>
                </li>
              ))}
            </ul>

            {addingForDay === day ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Meal title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={form.calories}
                  onChange={(e) => setForm({ ...form, calories: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={form.protein}
                  onChange={(e) => setForm({ ...form, protein: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Ingredients (comma separated)"
                  value={form.ingredients}
                  onChange={(e) =>
                    setForm({ ...form, ingredients: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-md border text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <div className="flex gap-2">
                  <button
                    onClick={saveMeal}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelAdding}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => startAdding(day)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
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
