import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  console.log('render ingredients')
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()

  const addIngredientHandler = ({ title, amount }) => {
    setIsLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' }
    })
      .then(res => {
        setIsLoading(false);
        return res.json()
      })
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

  const filteredIngredients = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, [])

  const onRemoveItem = (id) => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.son`, {
      method: 'DELETE'
    })
      .then(() => {
        setIsLoading(false);
        setIngredients((prevIngr) => {
          console.log('prev', prevIngr);
          console.log('curr', ingredients)
          return prevIngr.filter(item => item.id !== id)

        });
        // setIngredients(ingredients.filter(item => item.id !== id));
      })
      .catch((error) => {
        setError(error.message)
      })
  }


  const clearError = () => {
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">

      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm addIngredientHandler={addIngredientHandler} loading={isLoading} />

      <section>
        <Search filteredIngredients={filteredIngredients} />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
