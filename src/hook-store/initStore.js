import { initStore } from './hookstore';

const configureStore = () => {
  const initialData = {
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

  const initialActions = {
    TOGGLE_FAV: (globalStore, id) => {
      const favIndex = globalStore.products.findIndex(i => i.id === id);
      const favValue = !globalStore.products[favIndex].isFavorite;
      const newProdList = [...globalStore.products];
      newProdList[favIndex].isFavorite = favValue;

      return { products: [...newProdList] };
    },
  };

  initStore(initialActions, initialData);
};

export default configureStore;
