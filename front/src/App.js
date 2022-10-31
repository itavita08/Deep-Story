
import React from 'react';
import SendText from './SendText';
import LogoutHeader from './components/Header/LogoutHeader';


import SidebarLoginComponent from './components/Sidebar/SidebarLogoutComponent';

import {Route, Routes, useNavigate} from "react-router-dom";

import { Link } from 'react-router-dom';


function App(props) {

  // const isLoggedIn = props.isLoggedIn;

  // const ListProductsSalePage = () => {
  //   const navigate = useNavigate();
   
  //   const navigateToLogin = () => {
  //     navigate("/LoginComponent");
  //   };

	return (

		<div className='App'>

        <LogoutHeader>
        </LogoutHeader>

        <SidebarLoginComponent>
        </SidebarLoginComponent>

      
		</div>
	);

}

export default App;


