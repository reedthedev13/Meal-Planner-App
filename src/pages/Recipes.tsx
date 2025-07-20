import { useEffect } from "react";
import { motion } from "framer-motion";

const dummyRecipes = [
  { id: 1, title: "Spaghetti Bolognese", servings: 4 },
  { id: 2, title: "Chicken Stir Fry", servings: 2 },
  { id: 3, title: "Veggie Tacos", servings: 3 },
];

const Recipes = () => {
  useEffect(() => {
    document.title = "Recipes | Meal Planner";
  }, []);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Your Recipes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {recipe.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Servings: {recipe.servings}
            </p>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
        + Add Recipe
      </button>
    </motion.div>
  );
};

export default Recipes;
