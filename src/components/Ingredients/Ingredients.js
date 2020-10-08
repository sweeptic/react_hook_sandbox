import React, { useEffect, useState } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  console.log('render Ingredients');

  const [ingredients, setIngredients] = useState([]);


  useEffect(() => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
      .then(resp => resp.json())
      .then(data => {
        const loadedList = []
        for (const key in data) {
          const item = {
            id: key,
            title: data[key].title,
            amount: data[key].amount
          }
          loadedList.push(item);
        }
        setIngredients(loadedList);
      })
  }, []);


  const AddIngredient = ingredient => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)

        const item = {
          id: data.name,
          title: ingredient.title,
          amount: ingredient.amount
        }
        setIngredients(prevState => [...prevState, item]);
      })
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
