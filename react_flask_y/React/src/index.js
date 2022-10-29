import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";


import store from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <CookiesProvider>
    <Provider store={store}>

      <BrowserRouter>
          <App />
      </BrowserRouter>

    </Provider>
  </CookiesProvider>


);

reportWebVitals();

