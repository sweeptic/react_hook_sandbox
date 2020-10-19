import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ setLoading, setIngredients }) => {
  const [search, setSearch] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (search === inputRef.current.value) {
        setLoading(true);
        const query =
          search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
        fetch(
          'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
            query
        )
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
      }
    }, 1000);
  }, [search, setLoading, setIngredients]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            type='text'
            value={search}
            onChange={evt => setSearch(evt.target.value)}
            ref={inputRef}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
