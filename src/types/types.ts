export type Meal = "Breakfast" | "Lunch" | "Dinner";

export type PlannedMeal = {
  day: number;
  meal: Meal;
  recipeId: string;
  recipeTitle: string;
};

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};
