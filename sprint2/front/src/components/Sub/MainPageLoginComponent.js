
import React from 'react';

import PostCreateComponent from '../Board/PostCreateComponent';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader';
import MainPageCard from '../Sub/MainPageCard';
import Card from '../CardGroup/Card';


import {Route, Routes, useNavigate} from "react-router-dom";

import { Link } from 'react-router-dom';


export default function MainPageLoginComponent(props) {

  
      return (
  
          <div className='App'>
  
          <LoginHeader>
          </LoginHeader>
  
          <SidebarAdminLoginComponent>


          </SidebarAdminLoginComponent>
          <MainPageCard/>
        
          </div>
      );
  
  }
  

  
  
  