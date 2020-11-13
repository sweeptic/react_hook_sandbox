import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productReducer from './components/redux/reducer';

const productStore = combineReducers({
  shop: productReducer,
});

const store = createStore(productStore);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
