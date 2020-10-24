import React, { useCallback, useMemo, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  // const [ingredients, setIngredients] = useState([]);

  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'SET':
        return action.ingredients;
      case 'ADD':
        return [...currentState, action.ingredient];
      case 'DELETE':
        return currentState.filter(i => i.id !== action.id);
      default:
        throw new Error('Should not get there');
    }
  };

  const HttpReducer = (currentState, action) => {
    switch (action.type) {
      case 'SEND':
        return { loading: true, error: null };
      case 'RESPONSE':
        return { ...currentState, loading: false };
      case 'ERROR':
        return { loading: false, error: action.errorMessage };
      case 'CLEAR':
        return { ...currentState, error: null };
      default:
        throw new Error('Should not get there');
    }
  };
  const [componentState, dispatch] = useReducer(reducer, []);

  const [httpState, dispatchHttp] = useReducer(HttpReducer, {
    loading: false,
    error: null,
  });

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const AddIngredientHandler = useCallback(({ title, amount }) => {
    // setLoading(true);
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ name }) => {
        // setLoading(false);
        dispatchHttp({ type: 'RESPONSE' });

        dispatch({ type: 'ADD', ingredient: { id: name, title, amount } });
        // setIngredients(prev => [...prev, { id: name, title, amount }]);
      })

      .catch(err => {
        dispatchHttp({ type: 'ERROR', errorMessage: err.message });
        // setError(true);
        // setLoading(false);
      });
  }, []);

  const RemoveItemHandler = useCallback(itemId => {
    dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${itemId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(res => res.json())
      .then(res => {
        dispatchHttp({ type: 'RESPONSE' });

        dispatch({ type: 'DELETE', id: itemId });
        // setIngredients(currState =>
        // currState.filter(item => item.id !== itemId)
        // );
      })
      .catch(err => {
        dispatchHttp({ type: 'ERROR', errorMessage: err.message });
        // setError(true);
        // setLoading(false);
      });
  }, []);

  // const onSetLoading = useCallback(loadingState => {
  //   setLoading(loadingState);
  // }, []);

  const onSetIngredients = useCallback(filteredIngredients => {
    dispatch({ type: 'SET', ingredients: filteredIngredients });
    // setIngredients(ingredients);
  }, []);

  const modalCloseHandler = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={componentState}
        onRemoveItem={RemoveItemHandler}
      />
    );
  }, [componentState, RemoveItemHandler]);

  return (
    <div className='App'>
      {httpState.error && (
        <ErrorModal onClose={modalCloseHandler}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredientHandler={AddIngredientHandler}
        loading={httpState.loading}
      />
      <section>
        <Search dispatchHttp={dispatchHttp} setIngredients={onSetIngredients} />
      </section>
      {ingredientList}
    </div>
  );
}

export default Ingredients;
