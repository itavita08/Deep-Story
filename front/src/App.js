
import React, { Component }  from 'react';
import LogoutHeader from './components/Header/LogoutHeader';
import SidebarLogoutComponent from './components/Sidebar/SidebarLogoutComponent';
import { getCookie } from './storage/Cookie';
import './App.css';


 function App(props) {

  const loggedInfo = getCookie('islogin');

 
	return (

		<div className='App'>

        <LogoutHeader></LogoutHeader> 

        <SidebarLogoutComponent></SidebarLogoutComponent>

		</div>
	);

}

export default App;



