import { create } from "zustand";
import { fetchRecipes as fetchRecipesFromApi } from "../api/recipeApi";

export type Recipe = {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  tags?: string[];
  servings?: number;
  prepTimeMinutes?: number;
  cookTimeMinutes?: number;
};

type RecipeStore = {
  recipes: Recipe[];
  savedRecipes: Recipe[];
  loading: boolean;
  error: string | null;

  fetchRecipes: () => Promise<void>;
  saveRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (id: string) => void;
};

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  savedRecipes: [],
  loading: false,
  error: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const recipes = await fetchRecipesFromApi(); // call your api util
      set({ recipes, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch recipes",
        loading: false,
      });
    }
  },

  saveRecipe: (recipe) => {
    const existing = get().savedRecipes.find((r) => r.id === recipe.id);
    if (!existing) {
      set((state) => ({
        savedRecipes: [...state.savedRecipes, recipe],
      }));
    }
  },

  removeSavedRecipe: (id) => {
    set((state) => ({
      savedRecipes: state.savedRecipes.filter((r) => r.id !== id),
    }));
  },
}));
