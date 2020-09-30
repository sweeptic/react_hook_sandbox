import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  console.log('Ingredients RENDER');

  const [userIngredients, setUserIngredients] = useState([])

  const AddIngredientHandler = ingredient => {
    setUserIngredients((prevIngredient) => {
      return [...prevIngredient, { id: Math.random().toString(), ...ingredient }]
    })
  }

  const onRemoveItem = (id) => {
    setUserIngredients((prevIngredients) => {
      return prevIngredients.filter(item => item.id !== id)
    })
  }


  return (
    <div className="App">
      <IngredientForm onAddIngredient={AddIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );


}

export default Ingredients;
