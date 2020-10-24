import React, { useCallback, useMemo, useReducer, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';
import useHttp from './../http/http';

function Ingredients() {
  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredient;
      case 'ADD':
        return [...currentState, action.ingredient];
      case 'DELETE':
        return currentState.filter(i => i.id !== action.id);
      default:
        throw new Error('Should not get there');
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

  const [componentState, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const addIngredientHandler = useCallback(
    ingredient => {
      sendRequest(
        //url, method, body, reqExtra, reqIdentifer
        'https://react-hooks-update-7337b.firebaseio.com/ingredients.json',
        'POST',
        JSON.stringify(ingredient),
        ingredient,
        'ADD_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const RemoveItemHandler = useCallback(
    ingredientId => {
      console.log(ingredientId);
      sendRequest(
        //url, method, body, reqExtra, reqIdentifer
        `https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'REMOVE_INGREDIENT'
      );
    },
    [sendRequest]
  );

  const onSetIngredients = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredient: filteredIngredients });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={componentState}
        onRemoveItem={RemoveItemHandler}
      />
    );
  }, [componentState, RemoveItemHandler]);

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredientHandler={addIngredientHandler} />
      <section>
        <Search setIngredients={onSetIngredients} />
      </section>
      {ingredientList}
    </div>
  );
}

export default Ingredients;
