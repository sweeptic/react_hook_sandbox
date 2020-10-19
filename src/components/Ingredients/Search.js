import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [search, setSearch] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (search === inputRef.current.value) {
        props.setLoading(true);
        const query =
          search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
        fetch(
          'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
            query
        )
          .then(res => res.json())
          .then(res => {
            props.setLoading(false);
            console.log(res);
          });
      }
    }, 1000);
  }, [search]);

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
