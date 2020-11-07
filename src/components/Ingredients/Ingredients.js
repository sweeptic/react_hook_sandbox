import React, { useState, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialState = [];

  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'ADD': {
        return [...currentState, action.newIngredient];
      }
      case 'DELETE': {
        return [...currentState.filter(i => i.id !== action.deleteId)];
      }
      case 'SET': {
        return action.ingredients;
      }
      default:
        throw new Error('should not get there');
    }
  };
  const [componentState, dispatch] = useReducer(reducer, initialState);

  const filteredIngredientHandler = useCallback(
    filteredIngredients =>
      dispatch({ type: 'SET', ingredients: filteredIngredients }),
    []
  );

  const onAddIngredientHandler = ({ name, amount }) => {
    setLoading(true);
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify({ title: name, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);

        dispatch({
          type: 'ADD',
          newIngredient: { name, amount, id: data.name },
        });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const onRemoveItem = id => {
    setLoading(true);
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(resp => {
        setLoading(false);
        dispatch({ type: 'DELETE', deleteId: id });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        addIngredientHandler={onAddIngredientHandler}
        loading={loading}
      />

      <section>
        <Search
          filteredIngredients={filteredIngredientHandler}
          setError={setError}
          setLoading={setLoading}
          loading={loading}
        />
        <IngredientList
          ingredients={componentState}
          onRemoveItem={onRemoveItem}
        />
      </section>
    </div>
  );
}

export default Ingredients;
