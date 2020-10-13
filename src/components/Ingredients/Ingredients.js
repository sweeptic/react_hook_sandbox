import React, { useCallback, useEffect, useReducer, useMemo } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import useHttp from "./../http/http";

function Ingredients() {
  const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
      case "SET":
        return action.ingredients;
      case "ADD":
        return [...currentIngredients, action.ingredient];
      case "DELETE":
        return currentIngredients.filter((ing) => ing.id !== action.id);
      default:
        throw new Error("Should not get there");
    }
  };

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const addIngredient = useCallback((ingredient) => {
    fetch("https://react-hooks-update-7337b.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((data) => {
        const item = {
          id: data.name,
          title: ingredient.title,
          amount: ingredient.amount,
        };

        dispatch({ type: "ADD", ingredient: item });
      })
      .catch((err) => {});
  }, []);

  const filteredIngredients = useCallback((filteredingredients) => {
    dispatch({ type: "SET", ingredients: filteredingredients });
  }, []);

  const removeIngredient = useCallback((id) => {
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((resp) => {
        dispatch({ type: "DELETE", id: id });
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredient}
      />
    );
  }, [userIngredients, removeIngredient]);

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredient} />

      <section>
        <Search filteredIngredients={filteredIngredients} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
