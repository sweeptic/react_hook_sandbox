import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
  console.log('render Ingredients');

  const [ingredients, setIngredients] = useState([]);


  const AddIngredient = (params) => {
    setIngredients((prevState) => [...prevState, { ...params, id: Math.random() }]);
  }


  return (
    <div className="App">
      <IngredientForm onAddIngredient={AddIngredient} />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
