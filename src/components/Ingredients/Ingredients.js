import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {

  const [ingredients, setIngredients] = useState([])

  const onSetIngredients = ({ title, amount }) => {
    setIngredients((prevState) => ([...prevState, { id: Math.random().toString(), title, amount }]))
  }

  const onRemoveItem = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <IngredientForm onSetIngredients={onSetIngredients} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
