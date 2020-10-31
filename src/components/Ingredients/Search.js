import React, { useState } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [search, setSearch] = useState('');

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
