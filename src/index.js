import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import StoreContext from './context_api/store-context';
// import { combineReducers, createStore } from 'redux';
// import { productReducer } from './components/redux/reducer';
// import { Provider } from 'react-redux';

// const reducers = combineReducers({ productReducer });
// const store = createStore(reducers);

ReactDOM.render(
  // <Provider store={store}>
  <StoreContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext>,
  // </Provider>
  document.getElementById('root')
);
