import React, { useEffect, useRef, useState } from 'react';
import Card from '../UI/Card';
import './Search.css';
import useHttp from './../http/http-hook';
import ErrorModal from './../UI/ErrorModal';

const Search = React.memo(({ filteredIngredients, dispatchHttpState }) => {
  const [search, setSearch] = useState('');
  const refToSearch = useRef();
  const { requestHandler, data, loading, error, clearError } = useHttp();

  useEffect(() => {
    const dataList = [];
    if (data && !error && !loading) {
      for (const key in data) {
        dataList.push({
          id: key,
          name: data[key].title,
          amount: data[key].amount,
        });
      }
      filteredIngredients(dataList);
    }
  }, [data, filteredIngredients, error, loading]);

  useEffect(() => {
    const query =
      search.length === 0 ? '' : `?orderBy="title"&equalTo="${search}"`;

    const timer = setTimeout(
      () => {
        if (refToSearch.current.value === search) {
          requestHandler(
            'https://react-hooks-update-7337b.firebaseio.com/ingredients.json' +
              query
          );
        }
      },
      search.length === 0 ? 0 : 2000
    );

    return () => clearTimeout(timer);
  }, [requestHandler, search]);

  return (
    <section className='search'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          {loading && <div>loading...</div>}
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
