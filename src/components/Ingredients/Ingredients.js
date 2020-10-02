import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {

  const [ingredient, setIngredient] = ([])



  return (
    <div className="App">
      <IngredientForm />

      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
