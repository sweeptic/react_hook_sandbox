import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const onAddIngredientHandler = ({ name, amount }) => {
    setIngredients(prevState => {
      return [...prevState, { name, amount, id: Math.random() }];
    });
  };

  const onRemoveItem = id => {
    setIngredients(prevState => {
      return [...prevState.filter(i => i.id !== id)];
    });
  };

  return (
    <div className='App'>
      <IngredientForm addIngredientHandler={onAddIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
