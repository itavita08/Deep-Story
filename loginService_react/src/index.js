import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import store from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

// axios.defaults.withCredentials = true;


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  //  <App />
  // </React.StrictMode>

  <CookiesProvider>
    <Provider store={store}>

        <BrowserRouter>
          <App />
      </BrowserRouter>

    </Provider>
  </CookiesProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
