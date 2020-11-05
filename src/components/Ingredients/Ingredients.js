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
      });
  }, []);

  const onAddIngredientHandler = ({ name, amount }) => {
    setIngredients(prevState => {
      return [...prevState, { name, amount, id: Math.random() }];
    });
  };

  const onRemoveItem = id => {
    setIngredients(prevState => {
      return [...prevState.filter(i => i.id !== id)];
    });
  };

  return (
    <div className='App'>
      <IngredientForm addIngredientHandler={onAddIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={onRemoveItem} />
      </section>
    </div>
  );
}

export default Ingredients;
