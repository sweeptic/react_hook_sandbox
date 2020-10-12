import React, { useCallback, useState } from 'react';
import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  // console.log('render Ingredients');

  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  // useEffect(() => {
  //   setLoading(true);
  //   fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
  //     .then(resp => resp.json())
  //     .then(data => {
  //       setLoading(false);
  //       const loadedList = []
  //       for (const key in data) {
  //         const item = {
  //           id: key,
  //           title: data[key].title,
  //           amount: data[key].amount
  //         }
  //         loadedList.push(item);
  //       }
  //       setIngredients(loadedList);
  //     })
  // }, []);


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
        setIngredients(prevState => [...prevState, item]);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  }

  const filteredIngredients = useCallback((ingredients) => {
    setIngredients(ingredients);
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
        setIngredients(prevState => [...prevState.filter(item => item.id !== id)])
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      })
  }

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
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredient} />
      </section>
    </div>
  );
}

export default Ingredients;
