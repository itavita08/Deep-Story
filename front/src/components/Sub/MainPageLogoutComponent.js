import React from 'react';
import LogoutHeader from '../Header/LogoutHeader';
import MainPagebestPost from './MainPagebestPost'
import MainPagePlayer from './MainPagePlayer'
import SideNavigation from '../Sidebar/SidebarLogoutComponent';
import './MainPageLoginComponent.css';

const MainPageLogoutComponent = () => {
  return (
    <div>
      <MainPagePlayer/>
      <MainPagebestPost/>

    </div>
  )
}
export default MainPageLogoutComponent;