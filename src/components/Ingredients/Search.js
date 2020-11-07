import React, { useEffect, useRef, useState } from 'react';
import Card from '../UI/Card';
import './Search.css';
import useHttp from './../../http/http';
import ErrorModal from './../UI/ErrorModal';

const Search = React.memo(({ filteredIngredients }) => {
  const [search, setSearch] = useState('');
  const refToSearch = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const query =
      search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;
    const timer = setTimeout(
      () => {
        if (refToSearch.current.value === search) {
          sendRequest(
            'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
              query,
            'GET'
          );
        }
      },
      search.length === 0 ? 0 : 2000
    );
    return () => clearTimeout(timer);
  }, [search, filteredIngredients, sendRequest]);

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        });
      }
      filteredIngredients(loadedIngredients);
    }
  }, [data, error, filteredIngredients, isLoading]);

  return (
    <section className='search'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          {isLoading && <div> loading...</div>}
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
