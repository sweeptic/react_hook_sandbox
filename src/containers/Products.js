import React from 'react';
import { useSelector, useStore } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import './Products.css';

const Products = props => {
  const items = useSelector(state => state.shop.products);

  const productList = items;

  return (
    <ul className='products-list'>
      {productList.map(prod => (
        <ProductItem
          key={prod.id}
          id={prod.id}
          title={prod.title}
          description={prod.description}
          isFav={prod.isFavorite}
        />
      ))}
    </ul>
  );
};

export default Products;
