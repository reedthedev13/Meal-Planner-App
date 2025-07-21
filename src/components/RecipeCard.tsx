import React, { useState } from "react";

type RecipeCardProps = {
  title: string;
  imageUrl?: string;
  description?: string;
  onAddToPlan: (recipeTitle: string) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  imageUrl,
  description,
  onAddToPlan,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const startAdding = () => {
    setIsAdding(true);
    setInputValue(title); // default to current title or empty string
  };

  const saveMeal = () => {
    if (inputValue.trim() !== "") {
      onAddToPlan(inputValue.trim());
      setIsAdding(false);
      setInputValue("");
    }
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setInputValue("");
  };

  return (
    <div className="bg-[#2b2b31] rounded-lg shadow-md overflow-hidden flex flex-col">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-40 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#ffb86b] mb-2">{title}</h3>
        <p className="text-[#a6a6a6] flex-grow">
          {description ?? "No description"}
        </p>

        {isAdding ? (
          <div className="mt-4 flex flex-col space-y-2">
            <input
              type="text"
              className="rounded-md bg-[#1e1b17] border border-[#ffb86b] text-[#fefae0] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ffb86b]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") saveMeal();
                if (e.key === "Escape") cancelAdding();
              }}
              placeholder="Enter recipe title"
            />
            <div className="flex space-x-4">
              <button
                onClick={saveMeal}
                className="bg-[#ffb86b] text-[#1b1b1f] py-2 rounded-lg font-semibold hover:brightness-110 transition flex-grow"
              >
                Save
              </button>
              <button
                onClick={cancelAdding}
                className="bg-[#555555] text-[#fefae0] py-2 rounded-lg hover:bg-[#444444] transition flex-grow"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={startAdding}
            className="mt-4 bg-[#ffb86b] text-[#1b1b1f] py-2 rounded-lg font-semibold hover:brightness-110 transition"
          >
            Add to Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
