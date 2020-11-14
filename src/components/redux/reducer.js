import { TOGGLE_FAV } from './actions';

const initStore = {
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

export const productReducer = (store = initStore, action) => {
  switch (action.type) {
    case TOGGLE_FAV: {
      console.log('action');

      const favIndex = store.products.findIndex(i => i.id === action.toggleId);
      const newFavValue = !store.products[favIndex].isFavorite;
      const updatedProducts = [...store.products];

      updatedProducts[favIndex] = {
        ...store.products[favIndex],
        isFavorite: newFavValue,
      };

      return { ...store, products: updatedProducts };
    }

    default: {
      return store;
    }
  }
};
