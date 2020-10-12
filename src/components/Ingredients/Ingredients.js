import React, { useCallback, useState, useEffect, useReducer } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  // console.log('render Ingredients');
  const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentIngredients, action.ingredient];
      case 'DELETE':
        return currentIngredients.filter(ing => ing.id !== action.id)

      default:
        throw new Error('Should not get there')
    }
  }



  const initialState = [];
  const [userIngredients, dispatch] = useReducer(ingredientReducer, initialState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');




  const addIngredient = ingredient => {
    setLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setLoading(false);

        const item = {
          id: data.name,
          title: ingredient.title,
          amount: ingredient.amount
        }

        dispatch({ type: 'ADD', ingredient: item })
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  }

  const filteredIngredients = useCallback((filteredingredients) => {
    dispatch({ type: 'SET', ingredients: filteredingredients })
  }, [])


  const onSetLoading = useCallback((loadingState) => {
    setLoading(loadingState);
  }, [])


  const removeIngredient = id => {
    setLoading(true);
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then((resp) => {
        setLoading(false);
        dispatch({ type: 'DELETE', id: id })
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  }

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">

      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredient} loading={loading} />

      <section>
        <Search setLoading={onSetLoading} filteredIngredients={filteredIngredients} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
