import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Store from './store/store';

const store = new Store();

export const Context = createContext({
  store,
});

ReactDOM.render(
  <Context.Provider value={{
    store
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>,
  document.getElementById('root')
);