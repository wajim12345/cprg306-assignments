"use client";

import { useEffect, useState } from "react";

const fetchMealIdeas = async (ingredient) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!response.ok) {
      console.log(`Error: ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return [];
  }
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  const loadMealIdeas = async () => {
    setMeals(await fetchMealIdeas(ingredient));
  };
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
        <section className="text-2xl text-green-600 font-extrabold text-center">
        {!ingredient ? (
        <h1>
          Meal Ideas
        </h1>
      ) : (
        <h1>
          Meal Ideas for {ingredient}
        </h1>
      )}
        </section>
      
      <section className="text-xl text-purple-400">
        {!ingredient ? (
          <p>Select an item to see meal ideas</p>
        ) : meals.length === 0 ? (
          <p>No meal ideas found</p>
        ) : (
          meals.map((meal) => <p>{meal.strMeal}</p>)
        )}
      </section>
    </div>
  );
}
