import React, { useCallback, useReducer, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';
import useHttp from './../../http/http';

function Ingredients() {
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifier,
    clear,
  } = useHttp();

  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'ADD': {
        return [...currentState, action.ingredient];
      }
      case 'DELETE': {
        return [...currentState.filter(i => i.id !== action.id)];
      }
      case 'SET': {
        return action.ingredient;
      }
      default:
        throw new Error('should not get there');
    }
  };

  const [componentState, dispatch] = useReducer(reducer, []);

  const filteredIngredientHandler = useCallback(
    filteredIngredients =>
      dispatch({ type: 'SET', ingredient: filteredIngredients }),
    []
  );

  useEffect(() => {
    if (!isLoading && !error && reqIdentifier === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifier === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra },
      });
    }
  }, [data, error, isLoading, reqIdentifier, reqExtra]);

  const onAddIngredientHandler = ingredient => {
    sendRequest(
      //url, method, body, reqExtra, reqIdentifer
      'https://react-hooks-update-7337b.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  };

  const onRemoveItem = ingredientId => {
    //url, method, body, reqExtra, reqIdentifer
    sendRequest(
      //url, method, body, reqExtra, reqIdentifer
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );
  };

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm
        loading={isLoading}
        addIngredientHandler={onAddIngredientHandler}
      />

      <section>
        <Search filteredIngredients={filteredIngredientHandler} />
        <IngredientList
          ingredients={componentState}
          onRemoveItem={onRemoveItem}
        />
      </section>
    </div>
  );
}

export default Ingredients;
