import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { StrictMode } from "react";

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router} from "react-router-dom";
import {Route, Routes } from "react-router-dom";

import { ProSidebarProvider } from 'react-pro-sidebar';

import "bootstrap/dist/css/bootstrap.css";

import SignComponets from './components/Account/SignComponents';
import MainPageLoginComponent from './components/Sub/MainPageLoginComponent';


import store from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import LoginComponent from './components/Account/LoginComponent';



const root = ReactDOM.createRoot(document.getElementById('root'));
// ReactDOM.render(
//   <Routeses />, document.getElementById('root'));

root.render(

  // <React.StrictMode>
  //  <App />
  // </React.StrictMode>

  //<ProSidebarProvider>
  
  <React.Fragment>
  <CookiesProvider>
    <Provider store={store}>


    <div>
        <BrowserRouter>


          <Routes>
            <Route path="/" exact element={<App />} />

            <Route path="/MainPageLogin" exact element={<MainPageLoginComponent />} />
            <Route path="/sign" exact element={<SignComponets />} />
            <Route path="/login" exact element={<LoginComponent />} />
            
          
          </Routes>


        </BrowserRouter>

        
    </div>

    </Provider>
  </CookiesProvider>
</React.Fragment>
//</ProSidebarProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
