import { useState, useEffect } from "react";
import RecipeForm from "./RecipeForm";
import { getRecipes } from "../api/api";

const RecipeManager = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecipes();
      setRecipes(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Manager</h1>
      <RecipeForm onRecipeCreated={fetchRecipes} />
      {loading && <p>Loading recipes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {recipes.map((r) => (
            <li key={r.id}>
              {r.title} - {r.servings} servings - {r.calories} calories
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeManager;
