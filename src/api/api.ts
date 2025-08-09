import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // no /api
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
