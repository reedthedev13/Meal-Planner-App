import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Recipe = {
  id: number;
  title: string;
  servings: number;
};

const dummyRecipes: Recipe[] = [
  { id: 1, title: "Spaghetti Bolognese", servings: 4 },
  { id: 2, title: "Chicken Stir Fry", servings: 2 },
  { id: 3, title: "Veggie Tacos", servings: 3 },
];

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newServings, setNewServings] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Recipes | Meal Planner";
  }, []);

  const startAdding = () => {
    setIsAdding(true);
    setNewTitle("");
    setNewServings(1);
    setError("");
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setError("");
  };

  const saveRecipe = () => {
    if (!newTitle.trim()) {
      setError("Title is required.");
      return;
    }
    if (newServings < 1) {
      setError("Servings must be at least 1.");
      return;
    }
    setRecipes((prev) => [
      ...prev,
      { id: Date.now(), title: newTitle.trim(), servings: newServings },
    ]);
    setIsAdding(false);
    setNewTitle("");
    setNewServings(1);
    setError("");
  };

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
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {recipe.title}
            </h3>
            <p className="text-gray-500 text-sm">Servings: {recipe.servings}</p>
          </div>
        ))}

        {isAdding && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Recipe title"
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <input
              type="number"
              min={1}
              placeholder="Servings"
              className="rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={newServings}
              onChange={(e) => setNewServings(Number(e.target.value))}
            />
            {error && (
              <p className="text-red-500 font-medium text-sm">{error}</p>
            )}
            <div className="flex space-x-3">
              <button
                onClick={saveRecipe}
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
        )}
      </div>

      {!isAdding && (
        <button
          onClick={startAdding}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Recipe
        </button>
      )}
    </motion.div>
  );
};

export default Recipes;
