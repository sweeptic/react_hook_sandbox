import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  console.log('Ingredients RENDER');

  const [userIngredients, setUserIngredients] = useState([])



  const filteredIngredientHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients)
  }, [])  //  <-this never change


  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => {
        return response.json()
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient }
        ])
      })
  }

  const onRemoveItem = (ingredientId) => {
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        setUserIngredients(prevIngredients => prevIngredients.filter(item => item.id !== ingredientId))
      })
  }



  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );


}

export default Ingredients;
