import React from 'react';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import useStore from '../hook-store/hookstore';
import './Products.css';

const Favorites = props => {
  const [store] = useStore();

  const favoriteProducts = store.products.filter(i => i.isFavorite === true);

  let content = <p className='placeholder'>Got no favorites yet!</p>;
  if (favoriteProducts.length > 0) {
    content = (
      <ul className='products-list'>
        {favoriteProducts.map(prod => (
          <FavoriteItem
            key={prod.id}
            id={prod.id}
            title={prod.title}
            description={prod.description}
          />
        ))}
      </ul>
    );
  }
  return content;
};

export default Favorites;
