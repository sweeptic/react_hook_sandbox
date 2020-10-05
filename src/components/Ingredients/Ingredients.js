import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  console.log('render ingredients')
  const [ingredients, setIngredients] = useState([]);


  const addIngredientHandler = ({ title, amount }) => {
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        const newIngredient = {
          id: res.name,
          title,
          amount
        }
        setIngredients((prevState) => [...prevState, newIngredient])
      })
  }




  // useEffect(() => {
  //   fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
  //     .then(res => res.json())
  //     .then(res => {
  //       const fetchedRecords = [];
  //       for (const key in res) {
  //         const data = {
  //           id: key,
  //           title: res[key].title,
  //           amount: res[key].amount
  //         }
  //         fetchedRecords.push(data);
  //       }
  //       console.log(fetchedRecords)
  //       setIngredients(fetchedRecords)
  //     })
  // }, [])


  const onRemoveItem = (id) => {
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    })
    setIngredients(ingredients.filter(item => item.id !== id));
  }


  const filteredIngredients = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, [])



  return (
    <div className="App">
      <IngredientForm addIngredientHandler={addIngredientHandler} />

      <section>
        <Search filteredIngredients={filteredIngredients} />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
