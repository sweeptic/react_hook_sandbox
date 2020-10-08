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
      .then(resp => {
        const loadedList = []
        for (const key in resp) {
          const item = {
            id: key,
            title: resp[key].title,
            amount: resp[key].amount
          }
          loadedList.push(item);
        }
        setIngredients(loadedList);
      })
  }, []);


  const AddIngredient = ingredient => {
    setIngredients(prevState => [...prevState, { ...ingredient, id: Math.random() }]);
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
