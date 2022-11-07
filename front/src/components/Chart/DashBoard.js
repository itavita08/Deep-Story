import React from 'react';
import GenderPieChart from './GenderPieChart';
import Total from './Total';
import AgeChart from './AgeChart';
import LoginChart from './LoginChart';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'

function DashBoard(){
    return(
        <div>
        <div id='bar'>
        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>
        </div>

        <div id='chart'>
            <Total></Total><br></br>
            <GenderPieChart></GenderPieChart><br></br>
            <AgeChart></AgeChart><br></br>
            <LoginChart></LoginChart><br></br>
        </div>
        </div>
    )
}

export default DashBoard;