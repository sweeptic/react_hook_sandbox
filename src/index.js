import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import { combineReducers, createStore } from 'redux';
import { productReducer } from './components/redux/reducer';
import { Provider } from 'react-redux';

const reducers = combineReducers({ productReducer });
const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
