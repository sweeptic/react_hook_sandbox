import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const dataList = [];
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`)
      .then(res => res.json())
      .then(data => {
        for (const key in data) {
          dataList.push({
            id: key,
            name: data[key].title,
            amount: data[key].amount,
          });
        }
        setIngredients(dataList);
      })
      .catch(() => {
        console.log('Error occured');
      });
  }, []);

  const onAddIngredientHandler = ({ name, amount }) => {
    fetch(`https://react-hooks-update-7337b.firebaseio.com/ingredients.json`, {
      method: 'POST',
      body: JSON.stringify({ title: name, amount }),
      headers: { 'Content-type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setIngredients(prevState => {
          return [...prevState, { name, amount, id: data.name }];
        });
      })
      .catch(() => {
        console.log('Error occured');
      });
  };

  const onRemoveItem = id => {
    fetch(
      `https://react-hooks-update-7337b.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then(resp =>
        setIngredients(prevState => {
          return [...prevState.filter(i => i.id !== id)];
        })
      )
      .catch(() => {
        console.log('Error occured');
      });
  };

  return (
    <div className='App'>
      <IngredientForm addIngredientHandler={onAddIngredientHandler} />

      <section>
        <Search setIngredients={setIngredients} />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
