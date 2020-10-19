import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  const AddIngredientHandler = ingrObj => {
    setIngredients(prev => [...prev, { ...ingrObj }]);
  };

  const RemoveItemHandler = itemId => {
    setIngredients(currState => currState.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  return (
    <div className='App'>
      <IngredientForm onAddIngredientHandler={AddIngredientHandler} />

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={RemoveItemHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
