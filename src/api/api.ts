import axios from 'axios';

const api = axios.create({
  baseURL:
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
      ? "http://127.0.0.1:8080/api"  // your local backend URL
      : "https://mealplanner-backend-p49f.onrender.com/api", // production URL
});


export const getRecipes = async (): Promise<any[]> => {
  try {
    const response = await api.get('/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const createRecipe = async (recipe: any): Promise<any> => {
  const response = await api.post('/recipes', recipe);
  return response.data;
};

export const updateRecipe = async (id: number, recipe: any): Promise<any> => {
  const response = await api.put(`/recipes/${id}`, recipe);
  return response.data;
};

export const deleteRecipe = async (id: number): Promise<any> => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};
