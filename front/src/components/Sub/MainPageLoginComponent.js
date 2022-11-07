
import React from 'react';
import LoginHeader from '../Header/LoginHeader'
import MainPagebestPost from './MainPagebestPost'
import MainPagePlayer from './MainPagePlayer'
import SidebarAll from '../Sidebar/SidebarAllComponent';
import './MainPageLoginComponent.css';

export default function MainPageLoginComponent(props) {

  
      return (
  
          <div className='App'>
  
          <LoginHeader>
          </LoginHeader>
          
          <SidebarAll>
          </SidebarAll>
          
          <MainPagePlayer/>
          <MainPagebestPost/>
          </div>
      );
  
  }
  

  
  
  
