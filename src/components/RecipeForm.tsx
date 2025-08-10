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
      className="bg-gradient-to-br from-[#0b1120] to-[#1e293b] p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-5 border border-gray-700"
    >
      <h2 className="text-3xl font-extrabold text-gray-100 google-sans-code mt-2 tracking-tight">
        Add Recipe
      </h2>

      <div>
        <label className="block text-gray-300 font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-600 px-4 py-2 bg-[#111827] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Enter recipe title"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 font-medium mb-1">Servings</label>
        <input
          type="number"
          value={servings}
          onChange={(e) =>
            setServings(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-600 px-4 py-2 bg-[#111827] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Number of servings"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 font-medium mb-1">Calories</label>
        <input
          type="number"
          value={calories}
          onChange={(e) =>
            setCalories(e.target.value === "" ? "" : Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-600 px-4 py-2 bg-[#111827] text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:outline-none"
          placeholder="Calories per serving"
          required
        />
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-semibold py-3 rounded-lg transition shadow-md"
      >
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
