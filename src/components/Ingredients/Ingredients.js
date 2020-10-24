import React, { useCallback, useMemo, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentState, action.ingredient];
      case 'DELETE':
        return currentState.filter(i => i.id !== action.id);
      default:
        throw new Error('Should not get there');
    }
  };

  const [componentState, dispatch] = useReducer(reducer, []);

  const AddIngredientHandler = useCallback(({ title, amount }) => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ name }) => {
        dispatch({ type: 'ADD', ingredient: { id: name, title, amount } });
      })

      .catch(err => {});
  }, []);

  const RemoveItemHandler = useCallback(itemId => {
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${itemId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(res => res.json())
      .then(res => {
        dispatch({ type: 'DELETE', id: itemId });
      })
      .catch(err => {});
  }, []);

  const onSetIngredients = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
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
      <IngredientForm onAddIngredientHandler={AddIngredientHandler} />
      <section>
        <Search setIngredients={onSetIngredients} />
      </section>
      {ingredientList}
    </div>
  );
}

export default Ingredients;
