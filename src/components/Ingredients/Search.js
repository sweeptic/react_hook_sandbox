import React, { useEffect, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ setIngredients }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const dataList = [];
    const query =
      search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
    fetch(
      'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query
    )
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
  }, [search, setIngredients]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            type='text'
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
