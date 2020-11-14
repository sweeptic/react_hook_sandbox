import React, { createContext, useState } from 'react';

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

//create context
export const Context = createContext({
  toggleFav: () => {},
  dataList: null,
});

// create provider
const StoreContext = props => {
  console.log('recreate');

  const [datalist, setDatalist] = useState(initStore);

  const toggleFavHandler = id => {
    setDatalist(currentState => {
      const favIndex = currentState.products.findIndex(i => i.id === id);
      const favValue = !currentState.products[favIndex].isFavorite;

      const newProdList = [...currentState.products];

      newProdList[favIndex].isFavorite = favValue;
      console.log(newProdList);

      return { ...currentState, products: newProdList };
    });
  };

  return (
    <Context.Provider
      value={{ toggleFav: toggleFavHandler, dataList: datalist }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default StoreContext;
