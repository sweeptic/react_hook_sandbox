import { TOGGLE_FAV } from './action';

const initialState = {
  products: [
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false,
    },
    {
      id: 'p2',
      title: 'Blue T-Shirt',
      description: 'A pretty blue t-shirt.',
      isFavorite: false,
    },
    {
      id: 'p3',
      title: 'Green Trousers',
      description: 'A pair of lightly green trousers.',
      isFavorite: false,
    },
    {
      id: 'p4',
      title: 'Orange Hat',
      description: 'Street style! An orange hat.',
      isFavorite: false,
    },
  ],
};

const productReducer = (store = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV: {
      const favIndex = store.products.findIndex(i => i.id === action.favId);

      const newFavStatus = !store.products[favIndex].isFavorite;

      const updatedProduct = [...store.products];

      updatedProduct[favIndex] = {
        ...store.products[favIndex],
        isFavorite: newFavStatus,
      };

      return { ...store, products: updatedProduct };
    }
    default:
      return { ...store };
  }
};

export default productReducer;
