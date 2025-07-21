import { useEffect, useState } from "react";
import { useRecipeStore } from "../store/useRecipeStore";
import RecipeCard from "./RecipeCard";
import MealPlanner from "./MealPlanner";
import type { PlannedMeal, Meal } from "../types/types";

const MealPlannerContainer = () => {
  const { recipes, fetchRecipes, loading, error } = useRecipeStore();

  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);

  const handleAddToPlan = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const newPlannedMeal: PlannedMeal = {
      id: crypto.randomUUID(),
      recipeId,
      recipeTitle: recipe.title,
      day: 0,
      meal: "Lunch", // default meal type
    };
    setPlannedMeals((prev) => [...prev, newPlannedMeal]);
  };

  const handleAddMeal = (day: number, meal: Meal) => {
    alert(
      `Add recipe for ${meal} on ${
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]
      } - implement UI to select recipe!`
    );
  };

  const handleRemoveMeal = (day: number, meal: Meal) => {
    setPlannedMeals((prev) =>
      prev.filter((m) => !(m.day === day && m.meal === meal))
    );
  };

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  if (loading) return <p className="text-white">Loading recipes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Available Recipes</h2>
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onAddToPlan={handleAddToPlan}
            />
          ))}
        </div>
      </div>

      <div>
        <MealPlanner
          plannedMeals={plannedMeals}
          onAddMeal={handleAddMeal}
          onRemoveMeal={handleRemoveMeal}
        />
      </div>
    </div>
  );
};

export default MealPlannerContainer;
