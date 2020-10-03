import React, { useEffect, useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([])


  const onSetIngredients = ({ title, amount }) => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(response => response.json())
      .then(responseData => {
        setIngredients((prevState) => ([...prevState, { id: responseData.name, title, amount }]))
      })
  }


  const onRemoveItem = (id) => {
    setIngredients(ingredients.filter((item) => item.id !== id));
  }


  useEffect(() => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const row in responseData) {
          const item = {
            id: row,
            amount: responseData[row].amount,
            title: responseData[row].title
          }
          loadedIngredients.push(item);
        }
        setIngredients(loadedIngredients)
      })
  }, [])

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
