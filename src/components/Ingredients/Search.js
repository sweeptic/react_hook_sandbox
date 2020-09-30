import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef()

  useEffect(() => {


    //ha van következo keystroke,  akkor torli az elozot.
    //ha 500ms beluli keystroke van. ha varunk, akkor az utolso 500ms utan lefut.
    const timer = setTimeout(() => {
      console.log('set timeout')
      // enteredFilter <- this is closure. the enteredfilter value 500ms ago ..
      if (enteredFilter === inputRef.current.value) {
        console.log('enteredfilter: ', enteredFilter);
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query)
          .then(response => response.json())
          .then(responseData => {
            const loadedingredients = []
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                loadedingredients.push(
                  {
                    id: key,
                    title: responseData[key].title,
                    amount: responseData[key].amount,
                  });
              }
            }
            onLoadIngredients(loadedingredients)
          })
      }
    }, 500);


    //can return something. it will be function. this is a cleanup function
    //will run before next use effect function run next time.
    //if return [] <- run when component gets unmounted.
    return () => {
      clearTimeout(timer);
    }

  }, [enteredFilter, onLoadIngredients, useRef])



  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
