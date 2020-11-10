import React, { useCallback, useEffect, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';
import useHttp from './../http/http-hook';

function Ingredients() {
  const {
    requestHandler,
    data,
    loading,
    error,
    reqData,
    clearError,
    typeOfReq,
  } = useHttp();

  const ingredientReducer = (currentState, action) => {
    switch (action.type) {
      case 'SET': {
        return action.ingredients;
      }
      case 'ADD': {
        return [...currentState, action.ingredient];
      }
      case 'REMOVE': {
        return [...currentState.filter(i => i.id !== action.removedId)];
      }
      default: {
        console.log('Should not get there');
      }
    }
  };

  const [ingredients, dispatchIngr] = useReducer(ingredientReducer, []);

  const filteredIngredientHandler = useCallback(dataList => {
    dispatchIngr({ type: 'SET', ingredients: dataList });
  }, []);

  useEffect(() => {
    if (!error && !loading) {
      if (typeOfReq === 'ADD_INGREDIENT') {
        dispatchIngr({
          type: 'ADD',
          ingredient: {
            name: reqData.title,
            amount: reqData.amount,
            id: data.name,
          },
        });
      } else if (typeOfReq === 'REMOVE_INGREDIENT') {
        dispatchIngr({
          type: 'REMOVE',
          removedId: reqData,
        });
      }
    }
  }, [data, error, loading, reqData, typeOfReq]);

  const onAddIngredientHandler = ({ name, amount }) => {
    requestHandler(
      // url, { method, body, headers}, typeOfReq
      'https://react-hooks-update-7337b.firebaseio.com/ingredients.json',
      'POST',
      { title: name, amount },
      'ADD_INGREDIENT'
    );
  };

  const onRemoveItem = id => {
    requestHandler(
      // url, { method, body, headers}, typeOfReq
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      id,
      'REMOVE_INGREDIENT'
    );
  };

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        loading={loading}
        addIngredientHandler={onAddIngredientHandler}
      />
      <section>
        <Search filteredIngredients={filteredIngredientHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
