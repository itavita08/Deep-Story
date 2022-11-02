import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router} from "react-router-dom";
import {Route, Routes } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import "bootstrap/dist/css/bootstrap.css";

import SignComponets from './components/Account/SignComponents';
import MainPageLoginComponent from './components/Sub/MainPageLoginComponent';
import LogoutComponet from './components/Account/LogoutComponet';
import LoginComponent from './components/Account/LoginComponent';
import PostCreateComponent from './components/Board/PostCreateComponent';
import DetailComponent from './components/Board/Detail'
import MypageComponent from './components/Sub/MypageComponent';
import UpdateProfilComponent from './components/Sub/UpdateProfilComponent';
import store from './store';
import { CookiesProvider } from 'react-cookie';
import Detail from './components/Board/Detail';
import Update from './components/Board/Update';




const root = ReactDOM.createRoot(document.getElementById('root'));

// let persistor = persistStore(store);

root.render(

  // <React.StrictMode>
  //  <App />
  // </React.StrictMode>
  
  <React.Fragment>
  <CookiesProvider>
    <Provider store={store}>

    {/* <PersistGate loading={null} persistor={persistor}> */}

    <div>
        <BrowserRouter>


          <Routes>
            <Route path="/" exact element={<App />} />

            <Route path="/MainPageLogin" exact element={<MainPageLoginComponent />} />
            <Route path="/sign" exact element={<SignComponets />} />
            <Route path="/login" exact element={<LoginComponent />} />
            <Route path="/logout" exact element={<LogoutComponet />} />
            <Route path="/postCreate" exact element={<PostCreateComponent />} />
            <Route path="/detail" exact element={<Detail />} />  
            <Route path="/mypage" exact element={<MypageComponent />} />  
            <Route path="/updateProfil" exact element={<UpdateProfilComponent />} />  
            <Route path="/update" exact element={<Update />}/>
            
          </Routes>
        </BrowserRouter>

    </div>

      {/* </PersistGate> */}
    </Provider>
  </CookiesProvider>
</React.Fragment>



);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
