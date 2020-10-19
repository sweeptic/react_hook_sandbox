import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  const AddIngredientHandler = ({ title, amount }) => {
    setLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ title, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(({ name }) => {
        setLoading(false);
        console.log(name);
        setIngredients(prev => [...prev, { id: name, title, amount }]);
      });
  };

  const RemoveItemHandler = itemId => {
    setLoading(true);
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${itemId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(res => res.json())
      .then(res => {
        setLoading(false);
        setIngredients(currState =>
          currState.filter(item => item.id !== itemId)
        );
      });
  };

  useEffect(() => {
    console.log(ingredients);
  }, [ingredients]);

  useEffect(() => {
    setLoading(true);
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json')
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        let loadedIngredients = [];
        for (const key in data) {
          loadedIngredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
          });
        }
        setIngredients(loadedIngredients);
      });
  }, []);

  const onSetLoading = loadingState => {
    setLoading(loadingState);
  };

  return (
    <div className='App'>
      <IngredientForm
        onAddIngredientHandler={AddIngredientHandler}
        loading={loading}
      />

      <section>
        <Search setLoading={onSetLoading} />
        {/* Need to add list here! */}
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={RemoveItemHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
