import React from 'react';

import './IngredientList.css';

const IngredientList = props => {

  console.log('ingredientList RENDER')

  // const onRemoveItem = (id) => props.onRemoveItem(id)



  console.log("----")
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={() => props.onRemoveItem(ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
