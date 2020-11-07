import React, { useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
// import ErrorModal from './../UI/ErrorModal';

function Ingredients() {
  // const httpReducer = (currentState, action) => {
  //   switch (action.type) {
  //     case 'SEND': {
  //       return { loading: true, error: null };
  //     }
  //     case 'RESPONSE': {
  //       return { ...currentState, loading: false };
  //     }
  //     case 'ERROR': {
  //       return { loading: false, error: action.errorMessage };
  //     }
  //     case 'CLEAR': {
  //       return { ...currentState, error: null };
  //     }
  //     default:
  //       throw new Error('should not get there');
  //   }
  // };

  const reducer = (currentState, action) => {
    switch (action.type) {
      case 'ADD': {
        return [...currentState, action.newIngredient];
      }
      case 'DELETE': {
        return [...currentState.filter(i => i.id !== action.deleteId)];
      }
      case 'SET': {
        return action.ingredients;
      }
      default:
        throw new Error('should not get there');
    }
  };

  const [componentState, dispatch] = useReducer(reducer, []);

  // const [httpState, dispatchHttp] = useReducer(httpReducer, {
  //   loading: false,
  //   error: null,
  // });

  const filteredIngredientHandler = useCallback(
    filteredIngredients =>
      dispatch({ type: 'SET', ingredients: filteredIngredients }),
    []
  );

  const onAddIngredientHandler = ({ name, amount }) => {
    // setLoading(true);
    // dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify({ title: name, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        // dispatchHttp({ type: 'RESPONSE' });
        // dispatch({
        //   type: 'ADD',
        //   newIngredient: { name, amount, id: data.name },
        // });
      })
      .catch(err => {
        // dispatchHttp({ type: 'ERROR', errorMessage: err.message });
      });
  };

  const onRemoveItem = id => {
    // dispatchHttp({ type: 'SEND' });
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(resp => {
        // dispatchHttp({ type: 'RESPONSE' });
        // dispatch({ type: 'DELETE', deleteId: id });
      })
      .catch(err => {
        // dispatchHttp({ type: 'ERROR', errorMessage: err.message });
      });
  };

  // const clearError = () => {
  //   dispatchHttp({ type: 'CLEAR' });
  // };

  return (
    <div className='App'>
      {/* {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )} */}
      <IngredientForm
        addIngredientHandler={onAddIngredientHandler}
        // loading={httpState.loading}
      />

      <section>
        <Search
          filteredIngredients={filteredIngredientHandler}
          // dispatchHttp={dispatchHttp}
        />
        <IngredientList
          ingredients={componentState}
          onRemoveItem={onRemoveItem}
        />
      </section>
    </div>
  );
}

export default Ingredients;
