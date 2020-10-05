import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredfilter] = useState('')
  const inputRef = useRef() //connection between the inputRef element and this element
  console.log('render Search')

  useEffect(() => {



    const timer = setTimeout(() => {

      //entered <-> entered 500ms ago (when we set the timeout)
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query)
          .then(res => res.json())
          .then(res => {
            console.log('fetch from server')
            const fetchedRecords = [];
            for (const key in res) {
              const data = {
                id: key,
                title: res[key].title,
                amount: res[key].amount
              }
              fetchedRecords.push(data);
            }
            props.filteredIngredients(fetchedRecords)
          })
      }


    }, 2000);
    //useeffect cleanup. runs before next useEffect runs.
    return () => {
      clearTimeout(timer)
    }

  }, [enteredFilter, props.filteredIngredients, inputRef])




  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input

            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={evt => setEnteredfilter(evt.target.value)}

          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
