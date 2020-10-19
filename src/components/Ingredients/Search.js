import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ /*setLoading,*/ setIngredients }) => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const timeOutVal = search.length === 0 ? 0 : 1000;
    const timer = setTimeout(() => {
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
    }, timeOutVal);
    return () => clearTimeout(timer);
  }, [search, setIngredients]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title </label>
          {loading && <div> loading...</div>}
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
