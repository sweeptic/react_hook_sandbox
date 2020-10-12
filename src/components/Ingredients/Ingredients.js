import React, { useCallback, useEffect, useReducer, useMemo } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';


function Ingredients() {

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

  const httpReducer = (currHttpState, action) => {
    switch (action.type) {
      case 'SEND':
        return { loading: true, error: null }
      case 'RESPONSE':
        return { ...currHttpState, loading: false }
      case 'ERROR':
        return { loading: false, error: action.errorMessage }
      case 'CLEAR':
        return { ...currHttpState, error: null }
      default:
        throw new Error('Should not get there')
    }
  }

  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null });



  const addIngredient = useCallback(ingredient => {

    dispatchHttp({ type: 'SEND' })
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-type': 'application/json' }
    })
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        dispatchHttp({ type: 'RESPONSE' })

        const item = {
          id: data.name,
          title: ingredient.title,
          amount: ingredient.amount
        }

        dispatch({ type: 'ADD', ingredient: item })
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', errorMessage: err.message })
      })
  }, [])

  const filteredIngredients = useCallback((filteredingredients) => {
    dispatch({ type: 'SET', ingredients: filteredingredients })
  }, [])



  const removeIngredient = useCallback(id => {
    dispatchHttp({ type: 'SEND' })
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    })
      .then((resp) => {
        dispatchHttp({ type: 'RESPONSE' })
        dispatch({ type: 'DELETE', id: id })
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', errorMessage: err.message })
      })
  }, [])

  useEffect(() => {
    console.log('RENDERING INGREDIENTS', userIngredients)
  }, [userIngredients])


  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' })
  }, [])

  //
  const ingredientList = useMemo(() => {
    return <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredient} />
  }, [userIngredients, removeIngredient])

  return (
    <div className="App">

      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredient} loading={httpState.loading} />

      <section>
        <Search dispatchHttp={dispatchHttp} filteredIngredients={filteredIngredients} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
