import React, { useContext } from 'react';
// import { useSelector } from 'react-redux';

import ProductItem from '../components/Products/ProductItem';
import { Context } from '../context_api/store-context';
import './Products.css';

const Products = props => {
  // const list = useSelector(store => store.productReducer.products);
  const list = useContext(Context);

  const productList = list.dataList.products;

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
