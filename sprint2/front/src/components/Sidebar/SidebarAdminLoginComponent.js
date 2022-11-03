import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart } from "react-icons/fa";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { AiFillCrown, AiFillSignal, AiFillHome, AiFillEdit, AiOutlineForm, AiFillLock, AiFillCodeSandboxSquare, AiFillPicture } from "react-icons/ai";
import { AiFillTool, AiFillAppstore } from "react-icons/ai";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

import LoginComponent from '../Account/LoginComponent';
import SignComponets from '../Account/SignComponents';
import PostCreateComponent from '../Board/PostCreateComponent';

import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { Link } from "react-router-dom";

function SideNavigation () {

  
    const [collapsed, setCollapsed] = useState(false);
    
    const navigate = useNavigate();
    
    const clickPost = async () => {

      navigate("/postCreate");

    };
    

  
    // added styles
    const styles = {
      sideBarHeight: {
        height: "100vh"
      },
      menuIcon: {
        float: "right",
        margin: "10px"
      }
    };
    const onClickMenuIcon = () => {
      setCollapsed(!collapsed);
    };

  return (

    <div>
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
        
        <SidebarHeader>
  
          <div style={styles.menuIcon} onClick={onClickMenuIcon}>
            <AiOutlineMenu />
          </div>
  
        </SidebarHeader>
  
        <Menu iconShape="square">
  
        <SubMenu title="Home" icon={<AiFillHome />}>
          <MenuItem icon={<AiFillAppstore />}><Link to = "/postAllLogin">View All</Link></MenuItem>
        </SubMenu>
  
  
          <SubMenu title="My Page" icon={<AiFillCrown />}>
            
           <MenuItem icon={<AiOutlineForm />} ><Link to="/mypage">Profil</Link></MenuItem> 

           <MenuItem icon={<AiOutlineForm />} ><Link to="/postCreate">Create</Link></MenuItem> 

            
            <MenuItem icon={<AiFillPicture />}><Link to="/getGellery">Gellery</Link></MenuItem>
            
            <MenuItem icon={<FaHeart />}><Link to="/">Interest</Link></MenuItem>
            <MenuItem icon={<AiFillLock />}><Link to="/">Secret</Link></MenuItem>

          </SubMenu>
  
          <SubMenu title="Admin" icon={< AiFillTool/>} >
            <MenuItem icon={<AiFillSignal />}><Link to="/">Dash Board</Link></MenuItem>
          </SubMenu>

            <div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
          
        <MenuItem icon={<AiOutlineLogout />}><Link to="/logout">Logout</Link></MenuItem>
  
        
        </Menu>


      </ProSidebar>

 

      </div>


    );
  };
  
  export default SideNavigation;