import React from "react";

type RecipeCardProps = {
  id: string;
  title: string;
  imageUrl?: string;
  description?: string;
  onAddToPlan: (id: string) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  imageUrl,
  description,
  onAddToPlan,
}) => {
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
        <button
          onClick={() => onAddToPlan(id)}
          className="mt-4 bg-[#ffb86b] text-[#1b1b1f] py-2 rounded-lg font-semibold hover:brightness-110 transition"
        >
          Add to Plan
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
