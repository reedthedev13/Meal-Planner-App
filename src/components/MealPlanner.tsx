import React from "react";

type Meal = "Breakfast" | "Lunch" | "Dinner";

type PlannedMeal = {
  day: number;
  meal: Meal;
  recipeId: string;
  recipeTitle: string;
};

type MealPlannerProps = {
  plannedMeals: PlannedMeal[];
  onAddMeal: (day: number, meal: Meal) => void;
  onRemoveMeal: (day: number, meal: Meal) => void;
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const meals: Meal[] = ["Breakfast", "Lunch", "Dinner"];

const MealPlanner: React.FC<MealPlannerProps> = ({
  plannedMeals,
  onAddMeal,
  onRemoveMeal,
}) => {
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
                    ) : (
                      <button
                        onClick={() => onAddMeal(dayIndex, meal)}
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
