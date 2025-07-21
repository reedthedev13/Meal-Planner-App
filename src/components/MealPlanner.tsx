import React, { useState } from "react";

type Meal = "Breakfast" | "Lunch" | "Dinner";

type PlannedMeal = {
  day: number;
  meal: Meal;
  recipeTitle: string;
};

type MealPlannerProps = {
  plannedMeals: PlannedMeal[];
  onAddMeal: (day: number, meal: Meal, recipeTitle: string) => void;
  onRemoveMeal: (day: number, meal: Meal) => void;
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const meals: Meal[] = ["Breakfast", "Lunch", "Dinner"];

const MealPlanner: React.FC<MealPlannerProps> = ({
  plannedMeals,
  onAddMeal,
  onRemoveMeal,
}) => {
  // Local state to track which cell is currently being edited
  const [addingCell, setAddingCell] = useState<{
    day: number;
    meal: Meal;
  } | null>(null);
  const [inputValue, setInputValue] = useState("");

  const startAdding = (day: number, meal: Meal) => {
    setAddingCell({ day, meal });
    setInputValue("");
  };

  const submitMeal = () => {
    if (addingCell && inputValue.trim() !== "") {
      onAddMeal(addingCell.day, addingCell.meal, inputValue.trim());
      setAddingCell(null);
      setInputValue("");
    }
  };

  const cancelAdding = () => {
    setAddingCell(null);
    setInputValue("");
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-fixed w-full border-collapse border border-[#3d3d42] text-[#fefefe]">
        <thead>
          <tr>
            <th className="border border-[#3d3d42] p-2"></th>
            {days.map((day) => (
              <th
                key={day}
                className="border border-[#3d3d42] p-2 text-center font-semibold"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal}>
              <td className="border border-[#3d3d42] p-2 font-semibold">
                {meal}
              </td>
              {days.map((_, dayIndex) => {
                const planned = plannedMeals.find(
                  (m) => m.day === dayIndex && m.meal === meal
                );

                const isAdding =
                  addingCell?.day === dayIndex && addingCell?.meal === meal;

                return (
                  <td
                    key={dayIndex}
                    className="border border-[#3d3d42] p-2 text-center align-top"
                  >
                    {planned ? (
                      <div className="relative">
                        <span className="block mb-1">
                          {planned.recipeTitle}
                        </span>
                        <button
                          onClick={() => onRemoveMeal(dayIndex, meal)}
                          className="text-sm text-[#ffb86b] hover:underline"
                          aria-label={`Remove ${planned.recipeTitle} from ${meal} on ${days[dayIndex]}`}
                        >
                          Remove
                        </button>
                      </div>
                    ) : isAdding ? (
                      <div>
                        <input
                          type="text"
                          className="w-full p-1 rounded border border-[#ffb86b] text-[#1b1b1f]"
                          placeholder="Recipe title"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") submitMeal();
                            if (e.key === "Escape") cancelAdding();
                          }}
                          autoFocus
                        />
                        <div className="flex justify-between mt-1">
                          <button
                            onClick={submitMeal}
                            className="text-[#ffb86b] hover:underline text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelAdding}
                            className="text-[#ffb86b] hover:underline text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => startAdding(dayIndex, meal)}
                        className="text-sm text-[#ffb86b] hover:underline"
                      >
                        + Add
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlanner;
