import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  console.log('render Ingredients');

  const [ingredients, setIngredients] = useState([]);


  const AddIngredient = ingredient => {
    setIngredients(prevState => [...prevState, { ...ingredient, id: Math.random() }]);
  }

  const removeIngredient = id => {
    setIngredients(prevState => [...prevState.filter(item => item.id !== id)])
  }



  return (
    <div className="App">
      <IngredientForm onAddIngredient={AddIngredient} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
