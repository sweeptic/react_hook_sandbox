import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';

import FavoriteItem from '../components/Favorites/FavoriteItem';
import { Context } from '../context_api/store-context';
import './Products.css';

const Favorites = props => {
  console.log('re create fav');

  // const list = useSelector(store =>
  //   store.productReducer.products.filter(i => i.isFavorite === true)
  // );

  const list = useContext(Context);
  const productList = list.dataList.products.filter(i => i.isFavorite === true);

  const favoriteProducts = productList;

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
