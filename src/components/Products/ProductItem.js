import React, { useContext } from 'react';
import { Context } from '../../context_api/store-context';
// import { useDispatch } from 'react-redux';
// import { toggleFav_Actions } from '../redux/actions';

import Card from '../UI/Card';
import './ProductItem.css';

const ProductItem = props => {
  // const dispatch = useDispatch();

  const context = useContext(Context);

  const toggleFavHandler = () => {
    context.toggleFav(props.id);
    // dispatch(toggleFav_Actions(props.id));
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
};

export default ProductItem;
