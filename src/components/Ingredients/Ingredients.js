import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {

  console.log('Ingredients RENDER');

  const [userIngredients, setUserIngredients] = useState([])



  useEffect(() => {
    console.log('fetch data from server')
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData)
        const loadedingredients = []
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            loadedingredients.push(
              {
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
          }
        }
        console.log(loadedingredients)
        setUserIngredients(loadedingredients);
      })
  }, []) //<- external depedency




  const AddIngredientHandler = async ingredient => {
    const response = await
      fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-type': 'application/json' }
      })
    await response.json();
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
