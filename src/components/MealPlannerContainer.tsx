import { useState } from "react";
import RecipeCard from "./RecipeCard";
import MealPlanner from "./MealPlanner";
import type { Meal, PlannedMeal, Recipe } from "../types/types";

const mockRecipes: Recipe[] = [
  {
    id: "r1",
    title: "Spaghetti Bolognese",
    description: "Classic Italian pasta with rich meat sauce",
    imageUrl: "https://source.unsplash.com/featured/?spaghetti",
  },
  {
    id: "r2",
    title: "Chicken Caesar Salad",
    description: "Fresh romaine with grilled chicken and Caesar dressing",
    imageUrl: "https://source.unsplash.com/featured/?salad",
  },
  {
    id: "r3",
    title: "Vegetable Stir Fry",
    description: "Quick & healthy veggie medley with soy sauce",
    imageUrl: "https://source.unsplash.com/featured/?stirfry",
  },
];

const MealPlannerContainer = () => {
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeal[]>([]);

  const handleAddToPlan = (recipeId: string) => {
    // For demo: just add to next available slot (day 0, breakfast)
    // Better UX would let user pick day & meal or add via MealPlanner UI
    alert("Select a day & meal slot to add this recipe.");
  };

  const handleAddMeal = (day: number, meal: Meal) => {
    // For simplicity, prompt user to select recipe from list (replace with modal/selector)
    const recipeTitle = prompt(
      `Add recipe title for ${meal} on ${
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day]
      }:`
    );
    if (!recipeTitle) return;

    // Find recipe by title (in real app, use a proper selection UI)
    const recipe = mockRecipes.find(
      (r) => r.title.toLowerCase() === recipeTitle.toLowerCase()
    );

    if (!recipe) {
      alert("Recipe not found. Please add from the list.");
      return;
    }

    setPlannedMeals((prev) => [
      ...prev.filter((m) => !(m.day === day && m.meal === meal)), // remove existing for that slot
      { day, meal, recipeId: recipe.id, recipeTitle: recipe.title },
    ]);
  };

  const handleRemoveMeal = (day: number, meal: Meal) => {
    setPlannedMeals((prev) =>
      prev.filter((m) => !(m.day === day && m.meal === meal))
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <section>
        <h2 className="text-3xl font-bold mb-6 text-[#ffb86b]">Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {mockRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              imageUrl={recipe.imageUrl}
              description={recipe.description}
              onAddToPlan={handleAddToPlan}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-[#ffb86b]">Meal Planner</h2>
        <MealPlanner
          plannedMeals={plannedMeals}
          onAddMeal={handleAddMeal}
          onRemoveMeal={handleRemoveMeal}
        />
      </section>
    </div>
  );
};

export default MealPlannerContainer;
