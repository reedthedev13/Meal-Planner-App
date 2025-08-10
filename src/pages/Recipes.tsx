import { useState, useEffect } from "react";
import { getRecipes, deleteRecipe } from "../api/api";
import RecipeForm from "../components/RecipeForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Recipe = {
  id: string | number;
  title: string;
  servings: number;
  calories: number;
};

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch recipes function
  const fetchRecipes = () => {
    setLoading(true);
    getRecipes()
      .then((recipes) => {
        setRecipes(recipes);
        setError(null);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading recipes...</div>;
  }

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(Number(id)); // force convert to number here
        fetchRecipes();
      } catch (error: any) {
        alert("Failed to delete recipe: " + error.message);
      }
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gradient-to-r from-[#0b1120] to-[#111827] rounded-xl shadow-lg border border-gray-800">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent google-sans-code">
              Recipe List
            </h2>
            <p className="text-gray-400 text-base sm:text-lg google-sans-code tracking-tight max-w-xl">
              Stay organized and ensure you have everything you need for a
              delicious meal.
            </p>
          </div>

          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-lg transition font-medium shadow-md border border-gray-600"
          >
            ⬅️ Back to Home
          </Link>
        </div>

        <div className="max-w-2xl mx-auto p-5 space-y-6">
          {/* Recipe Form */}
          <RecipeForm onRecipeCreated={fetchRecipes} />

          {/* Recipe List */}
          {recipes.length === 0 ? (
            <p className="text-gray-400 text-center">No recipes found.</p>
          ) : (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border border-gray-700 rounded-xl p-5 shadow-md bg-gradient-to-br from-[#0b1120] to-[#1e293b] hover:shadow-lg transition duration-300 relative"
              >
                <h2 className="text-2xl font-bold text-gray-100 mb-3 google-sans-code tracking-tight">
                  {recipe.title}
                </h2>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-200">Servings:</span>{" "}
                  {recipe.servings}
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold text-gray-200">Calories:</span>{" "}
                  {recipe.calories}
                </p>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="
    absolute top-4 right-4 
    bg-red-600 hover:bg-red-700 
    text-white 
    px-3 py-1.5 
    rounded-full 
    shadow-md 
    hover:shadow-lg 
    transition 
    duration-300 
    ease-in-out
    flex items-center justify-center
    gap-1
    text-sm
  "
                  aria-label={`Delete recipe ${recipe.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Recipes;
