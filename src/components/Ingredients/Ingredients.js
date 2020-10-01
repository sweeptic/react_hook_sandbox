import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {


  const [ingredients, setUserIngredients] = useState([])



  const setIngerdientsHandler = (ingredient) => {


    setUserIngredients(prevIngredients => {
      console.log(prevIngredients)

      return ([
        ...prevIngredients,
        { id: Math.random().toString(), ...ingredient }
      ])
    })
  }


  return (
    <div className="App">
      <IngredientForm onSetIngerdients={setIngerdientsHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
