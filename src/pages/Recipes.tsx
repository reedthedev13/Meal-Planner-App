import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type Recipe = {
  id: number;
  title: string;
  servings: number;
  calories: number;
  protein: number;
  ingredients: string[];
};

const dummyRecipes: Recipe[] = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    servings: 4,
    calories: 600,
    protein: 25,
    ingredients: ["Spaghetti", "Beef", "Tomato Sauce"],
  },
  {
    id: 2,
    title: "Chicken Stir Fry",
    servings: 2,
    calories: 450,
    protein: 30,
    ingredients: ["Chicken", "Vegetables", "Soy Sauce"],
  },
  {
    id: 3,
    title: "Veggie Tacos",
    servings: 3,
    calories: 350,
    protein: 12,
    ingredients: ["Tortilla", "Beans", "Lettuce", "Cheese"],
  },
];

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(dummyRecipes);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newServings, setNewServings] = useState(1);
  const [newCalories, setNewCalories] = useState(0);
  const [newProtein, setNewProtein] = useState(0);
  const [newIngredients, setNewIngredients] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Recipes | Meal Planner";
  }, []);

  const startAdding = () => {
    setIsAdding(true);
    setNewTitle("");
    setNewServings(1);
    setNewCalories(0);
    setNewProtein(0);
    setNewIngredients("");
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

    const ingredientsArray = newIngredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i !== "");

    setRecipes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: newTitle.trim(),
        servings: newServings,
        calories: newCalories,
        protein: newProtein,
        ingredients: ingredientsArray,
      },
    ]);

    setIsAdding(false);
    setNewTitle("");
    setNewServings(1);
    setNewCalories(0);
    setNewProtein(0);
    setNewIngredients("");
    setError("");
  };

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
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
      <h2 className="text-3xl font-bold text-white font-serif ">
        Your Recipes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 space-y-2 relative"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Servings: {recipe.servings}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Calories: {recipe.calories}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Protein: {recipe.protein}g
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Ingredients: {recipe.ingredients.join(", ")}
            </p>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="flex items-center gap-1 mt-2 text-white bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded-full text-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}

        {isAdding && (
          <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-4 space-y-3">
            <input
              type="text"
              placeholder="Recipe title"
              className="w-full rounded-md border px-3 py-2"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <input
              type="number"
              min={1}
              placeholder="Servings"
              className="w-full rounded-md border px-3 py-2"
              value={newServings}
              onChange={(e) => setNewServings(Number(e.target.value))}
            />
            <input
              type="number"
              min={0}
              placeholder="Calories"
              className="w-full rounded-md border px-3 py-2"
              value={newCalories}
              onChange={(e) => setNewCalories(Number(e.target.value))}
            />
            <input
              type="number"
              min={0}
              placeholder="Protein (g)"
              className="w-full rounded-md border px-3 py-2"
              value={newProtein}
              onChange={(e) => setNewProtein(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              className="w-full rounded-md border px-3 py-2"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex space-x-3">
              <button
                onClick={saveRecipe}
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
        )}
      </div>
      {!isAdding && (
        <button
          onClick={startAdding}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Recipe
        </button>
      )}{" "}
      <HomeButton />
    </motion.div>
  );
};

export default Recipes;
