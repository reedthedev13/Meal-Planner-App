import React, { useState, useEffect } from "react";

type RecipeFormData = {
  title: string;
  description?: string;
  imageUrl?: string;
  calories?: number;
  protein?: number;
  ingredients?: string;
};

type RecipeFormProps = {
  initialData?: RecipeFormData;
  onSubmit: (data: RecipeFormData) => void;
  onCancel?: () => void;
};

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");
  const [calories, setCalories] = useState(initialData?.calories || 0);
  const [protein, setProtein] = useState(initialData?.protein || 0);
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients || ""
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setImageUrl(initialData?.imageUrl || "");
    setCalories(initialData?.calories || 0);
    setProtein(initialData?.protein || 0);
    setIngredients(initialData?.ingredients || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    setError("");
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      calories,
      protein,
      ingredients: ingredients.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2b2b31] p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-6"
    >
      <h2 className="text-2xl font-semibold text-[#ffb86b]">
        {initialData ? "Edit Recipe" : "Add New Recipe"}
      </h2>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md bg-[#1e1b17] border border-[#ffb86b] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="Recipe title"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-md bg-[#1e1b17] border border-[#555555] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="Brief description or notes"
          rows={3}
        />
      </div>

      {/* Image URL */}
      <div>
        <label
          htmlFor="imageUrl"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full rounded-md bg-[#1e1b17] border border-[#555555] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Calories */}
      <div>
        <label
          htmlFor="calories"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Calories
        </label>
        <input
          id="calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(Number(e.target.value))}
          className="w-full rounded-md bg-[#1e1b17] border border-[#555555] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="e.g. 450"
          min={0}
        />
      </div>

      {/* Protein */}
      <div>
        <label
          htmlFor="protein"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Protein (grams)
        </label>
        <input
          id="protein"
          type="number"
          value={protein}
          onChange={(e) => setProtein(Number(e.target.value))}
          className="w-full rounded-md bg-[#1e1b17] border border-[#555555] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="e.g. 30"
          min={0}
        />
      </div>

      {/* Ingredients */}
      <div>
        <label
          htmlFor="ingredients"
          className="block mb-1 font-medium text-[#f8f8f2]"
        >
          Ingredients
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full rounded-md bg-[#1e1b17] border border-[#555555] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
          placeholder="List ingredients, one per line or comma separated"
          rows={4}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-md bg-[#555555] text-[#fefae0] hover:bg-[#444444] transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 rounded-md bg-[#ffb86b] text-[#1b1b1f] font-semibold hover:brightness-110 transition"
        >
          {initialData ? "Save Changes" : "Add Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
