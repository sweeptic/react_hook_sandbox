import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';



const Search = React.memo(({ setLoading, filteredIngredients }) => {
  // console.log('render Search');
  const [search, setSearch] = useState('');


  useEffect(() => {
    setLoading(true);
    const query = search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`
    fetch('https://react-hooks-update-7337b.firebaseio.com/ingredients.json' + query)
      .then(resp => resp.json())
      .then(data => {
        setLoading(false);
        const loadedList = []
        for (const key in data) {
          const item = {
            id: key,
            title: data[key].title,
            amount: data[key].amount
          }
          loadedList.push(item);
        }
        console.log('useeffect run')
        filteredIngredients(loadedList);
      })
  }, [search, filteredIngredients]);


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={search} onChange={ev => setSearch(ev.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
