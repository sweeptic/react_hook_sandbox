import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {

  const [ingredient, setIngredient] = useState([])


  const setIngredientHandler = (ingredient) => {


    setIngredient((prevItems) => {
      console.log(prevItems);
      return (
        [
          ...prevItems, { id: Math.random().toString(), ...ingredient }
        ]
      )
    })
  }


  return (
    <div className="App">
      <IngredientForm onsetIngredient={setIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
