import React, { useEffect, useRef, useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ filteredIngredients }) => {
  const [search, setSearch] = useState('');
  const refToSearch = useRef();

  useEffect(() => {
    const dataList = [];
    const query =
      search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;

    const timer = setTimeout(
      () => {
        if (refToSearch.current.value === search) {
          fetch(
            'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
              query
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
              filteredIngredients(dataList);
            })
            .catch(() => {
              console.log('Error occured');
            });
        }
      },

      search.length === 0 ? 0 : 2000
    );

    return () => clearTimeout(timer);
  }, [search, filteredIngredients]);

  // useEffect(() => {
  //   effect

  //   return () => {
  //     cleanup
  //   }

  // }, [input])

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={refToSearch}
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
