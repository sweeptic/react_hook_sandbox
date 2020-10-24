import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import './Search.css';
import useHttp from './../http/http';
import ErrorModal from './../UI/ErrorModal';

const Search = React.memo(({ setIngredients }) => {
  const [search, setSearch] = useState('');

  const { isLoading, data, error, sendRequest, clear } = useHttp();

  const inputRef = useRef();

  useEffect(() => {
    // const timeOutVal = search.length === 0 ? 0 : 1000;
    const timer = setTimeout(
      () => {
        if (search === inputRef.current.value) {
          const query =
            search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;

          sendRequest(
            'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
              query,
            'GET'
          );
        }
      },
      !search ? 0 : 1500
    );

    return () => clearTimeout(timer);
  }, [search, setIngredients, sendRequest]);

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
      setIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, setIngredients]);

  return (
    <section className='search'>
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title </label>
          {isLoading && <div> loading...</div>}
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
