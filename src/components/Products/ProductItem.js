import React from 'react';
import useStore from '../../hook-store/hookstore';

import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = React.memo(props => {
  const [, dispatch] = useStore(false, props.id);
  console.log('render: ', props);

  const toggleFavHandler = () => {
    dispatch({ type: 'TOGGLE_FAV', id: props.id });
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className='product-item'>
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
