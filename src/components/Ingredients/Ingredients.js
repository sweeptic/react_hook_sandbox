import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(false);

  const filteredIngredientHandler = useCallback(
    dataList => setIngredients(dataList),
    []
  );

  const onAddIngredientHandler = ({ name, amount }) => {
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify({ title: name, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setIngredients(prevState => {
          return [...prevState, { name, amount, id: data.name }];
        });
      })
      .catch(err => {
        setError(err.message);
      });
  };

  const onRemoveItem = id => {
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(resp =>
        setIngredients(prevState => {
          return [...prevState.filter(i => i.id !== id)];
        })
      )
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
      <IngredientForm addIngredientHandler={onAddIngredientHandler} />

      <section>
        <Search
          filteredIngredients={filteredIngredientHandler}
          setError={setError}
        />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
