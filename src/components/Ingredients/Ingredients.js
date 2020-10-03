import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])

  const onSetIngredients = ({ title, amount }) => {
    console.log(ingredients)

    setIngredients((prevState) => {
      console.log(prevState)
      return ([
        ...prevState, { key: Math.random(), title, amount }
      ])
    })


  }


  return (
    <div className="App">
      <IngredientForm onSetIngredients={onSetIngredients} />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
