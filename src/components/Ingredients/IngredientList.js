import React from 'react';

import './IngredientList.css';

const IngredientList = React.memo(({ ingredients, onRemoveItem }) => {
  console.log('render list');
  return (
    <section className='ingredient-list'>
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map(ig => (
          <li key={ig.id} onClick={() => onRemoveItem(ig.id)}>
            <span>{ig.name}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;
