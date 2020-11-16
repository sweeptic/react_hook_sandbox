import React from 'react';

import ProductItem from '../components/Products/ProductItem';
import useStore from '../hook-store/hookstore';
import './Products.css';

const Products = props => {
  const [store] = useStore();

  const productList = store.products;
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
