import React, { useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';
import { ingredientReducer } from './ingredientReducer';

function Ingredients() {
  const httpStateReducer = (currentState, action) => {
    switch (action.type) {
      case 'SEND': {
        return { ...currentState, loading: true };
      }
      case 'RESPONSE': {
        return { ...currentState, loading: false };
      }
      case 'ERROR': {
        return { error: action.error, loading: false };
      }
      case 'CLEAR': {
        return { ...currentState, error: null };
      }
      default: {
        console.log('Should not get there');
      }
    }
  };

  const [ingredients, dispatchIngr] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttpState] = useReducer(httpStateReducer, {
    error: null,
    loading: false,
  });

  const filteredIngredientHandler = useCallback(dataList => {
    dispatchIngr({ type: 'SET', ingredients: dataList });
  }, []);

  const onAddIngredientHandler = ({ name, amount }) => {
    dispatchHttpState({ type: 'SEND' });
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify({ title: name, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        dispatchHttpState({ type: 'RESPONSE' });
        dispatchIngr({
          type: 'ADD',
          ingredient: { name, amount, id: data.name },
        });
      })
      .catch(err => {
        dispatchHttpState({ type: 'ERROR', error: 'Something went wrong!' });
      });
  };

  const onRemoveItem = id => {
    dispatchHttpState({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(resp => {
        dispatchHttpState({ type: 'RESPONSE' });
        dispatchIngr({
          type: 'REMOVE',
          removedId: id,
        });
      })
      .catch(err => {
        dispatchHttpState({ type: 'ERROR', error: 'Something went wrong!' });
      });
  };

  const clearError = () => {
    dispatchHttpState({ type: 'CLEAR' });
  };

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        addIngredientHandler={onAddIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search
          filteredIngredients={filteredIngredientHandler}
          dispatchHttpState={dispatchHttpState}
        />

        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
