import React, { useCallback, useEffect, useReducer, useMemo } from "react";
import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import useHttp from "./../http/http";
import ErrorModal from "./../UI/ErrorModal";

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

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear,
  } = useHttp();

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === "REMOVE_INGREDIENT") {
      dispatch({ type: "DELETE", id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === "ADD_INGREDIENT") {
      dispatch({
        type: "ADD",
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      //function coming from hook
      sendRequest(
        "https://react-hooks-update-7337b.firebaseio.com/ingredients.json",
        "POST",
        JSON.stringify(ingredient),
        ingredient,
        "ADD_INGREDIENT"
      );
    },
    [sendRequest]
  );

  const filteredIngredients = useCallback((filteredingredients) => {
    dispatch({ type: "SET", ingredients: filteredingredients });
  }, []);

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`,
        "DELETE",
        null,
        ingredientId,
        "REMOVE_INGREDIENT"
      );
    },
    [sendRequest]
  );

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  }, [userIngredients]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search filteredIngredients={filteredIngredients} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
