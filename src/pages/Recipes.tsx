import { useState, useEffect } from "react";
import { getRecipes } from "../api/api";
import RecipeForm from "../components/RecipeForm";

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

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <RecipeForm onRecipeCreated={fetchRecipes} />
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 15,
              marginBottom: 15,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#fafafa",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {recipe.title}
            </h2>
            <p>
              <strong>Servings:</strong> {recipe.servings}
            </p>
            <p>
              <strong>Calories:</strong> {recipe.calories}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Recipes;
