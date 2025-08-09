import React, { useState } from "react";
import { createRecipe } from "../api/api";

type Props = {
  onRecipeCreated: () => void;
};

const RecipeForm: React.FC<Props> = ({ onRecipeCreated }) => {
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState<number | "">("");
  const [calories, setCalories] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || servings === "" || calories === "") {
      setError("Please fill out all fields");
      return;
    }

    const recipe = { title, servings, calories };

    try {
      await createRecipe(recipe);
      setTitle("");
      setServings("");
      setCalories("");
      setError(null);
      onRecipeCreated();
    } catch (e) {
      setError("Failed to create recipe");
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-5"
    >
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
          Servings
        </label>
        <input
          type="number"
          value={servings}
          onChange={(e) =>
            setServings(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
          Calories
        </label>
        <input
          type="number"
          value={calories}
          onChange={(e) =>
            setCalories(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-600 focus:outline-none"
          required
        />
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
