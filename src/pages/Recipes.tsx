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
    if (!newTitle.trim()) return setError("Title is required.");
    if (newServings < 1) return setError("Servings must be at least 1.");

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
  };

  const handleDelete = (id: number) => {
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-10 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-extrabold text-white google-sans-code">Your Recipes</h1>
        <Link
          to="/"
          className="rounded-full px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          Home
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/10 shadow-xl text-white hover:scale-[1.01] transition-all duration-200"
          >
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-sm opacity-80">Servings: {recipe.servings}</p>
              <p className="text-sm opacity-80">Calories: {recipe.calories}</p>
              <p className="text-sm opacity-80">Protein: {recipe.protein}g</p>
              <p className="text-sm opacity-80">
                Ingredients:{" "}
                <span className="italic">{recipe.ingredients.join(", ")}</span>
              </p>
            </div>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-full transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        ))}

        {isAdding && (
          <div className="rounded-2xl bg-white/10 backdrop-blur p-6 border border-white/10 shadow-xl text-white space-y-4">
            <h3 className="text-lg font-semibold">Add New Recipe</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Servings"
              min={1}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60"
              value={newServings}
              onChange={(e) => setNewServings(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Calories"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60"
              value={newCalories}
              onChange={(e) => setNewCalories(Number(e.target.value))}
            />
            <input
              type="number"
              placeholder="Protein (g)"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60"
              value={newProtein}
              onChange={(e) => setNewProtein(Number(e.target.value))}
            />
            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60"
              value={newIngredients}
              onChange={(e) => setNewIngredients(e.target.value)}
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-3">
              <button
                onClick={saveRecipe}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
              >
                Save
              </button>
              <button
                onClick={cancelAdding}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {!isAdding && (
        <div className="flex justify-center">
          <button
            onClick={startAdding}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition"
          >
            + Add New Recipe
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Recipes;
