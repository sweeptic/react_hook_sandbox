import React, { useState, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const filteredIngredientHandler = useCallback(
    dataList => {
      dispatchIngr({ type: 'SET', ingredients: dataList });
    },

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

        dispatchIngr({
          type: 'ADD',
          ingredient: { name, amount, id: data.name },
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
        dispatchIngr({
          type: 'REMOVE',
          removedId: id,
        });
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

        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
