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
  ingredients: string[]; // list of ingredients
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

  const HomeButton = () => (
    <Link
      to="/"
      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
    >
      Home
    </Link>
  );

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-white font-serif">
        Weekly Meal Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 space-y-3"
          >
            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
              {day}
            </h3>

            {meals[day].length === 0 && (
              <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-sm text-gray-600 dark:text-gray-300">
                No meals assigned yet.
              </div>
            )}

            <ul className="space-y-2">
              {meals[day].map((meal, idx) => (
                <li
                  key={idx}
                  className="border border-gray-300 dark:border-gray-600 rounded-xl p-3 text-sm text-gray-800 dark:text-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{meal.title}</span>
                    <button
                      onClick={() => removeMeal(day, idx)}
                      className="text-xs text-red-500 hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-xs mt-1">
                    Calories: {meal.calories} | Protein: {meal.protein}g
                  </div>
                  <div className="text-xs mt-1 italic text-gray-500">
                    Ingredients: {meal.ingredients.join(", ")}
                  </div>
                </li>
              ))}
            </ul>

            {addingForDay === day ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="Meal title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Calories"
                  value={form.calories}
                  onChange={(e) =>
                    setForm({ ...form, calories: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Protein (g)"
                  value={form.protein}
                  onChange={(e) =>
                    setForm({ ...form, protein: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Ingredients (comma separated)"
                  value={form.ingredients}
                  onChange={(e) =>
                    setForm({ ...form, ingredients: e.target.value })
                  }
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />

                <div className="flex space-x-2">
                  <button
                    onClick={saveMeal}
                    className="flex-grow bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelAdding}
                    className="flex-grow bg-gray-400 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-500"
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
      <HomeButton />
    </motion.div>
  );
};

export default Planner;
