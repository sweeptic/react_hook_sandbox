import React, { useCallback, useMemo, useReducer, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);

  const initialState = [];

  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentState, action.ingredient];
      case 'DELETE':
        return currentState.filter(i => i !== action.itemId);
      default:
        throw new Error('Should not get there');
    }
  };

  const [componentState, dispatch] = useReducer(reducer, initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const AddIngredientHandler = useCallback(({ title, amount }) => {
    setLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ name }) => {
        setLoading(false);

        dispatch({ type: 'ADD', ingredient: { id: name, title, amount } });
        // setIngredients(prev => [...prev, { id: name, title, amount }]);
      })

      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const RemoveItemHandler = useCallback(itemId => {
    setLoading(true);
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${itemId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(res => res.json())
      .then(res => {
        setLoading(false);

        dispatch({ type: 'DELETE', id: itemId });
        // setIngredients(currState =>
        // currState.filter(item => item.id !== itemId)
        // );
      })
      .catch(err => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // const onSetLoading = useCallback(loadingState => {
  //   setLoading(loadingState);
  // }, []);

  const onSetIngredients = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
    // setIngredients(ingredients);
  }, []);

  const modalCloseHandler = () => {
    setError(false);
  };

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
      {error && <ErrorModal onClose={modalCloseHandler} />}
      <IngredientForm
        onAddIngredientHandler={AddIngredientHandler}
        loading={loading}
      />
      <section>
        <Search setIngredients={onSetIngredients} />
      </section>
      {ingredientList}
    </div>
  );
}

export default Ingredients;
