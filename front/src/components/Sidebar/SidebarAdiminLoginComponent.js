import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart } from "react-icons/fa";

import { Link as RouterLink } from 'react-router-dom';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { AiFillCrown, AiFillSignal, AiFillHome, AiFillEdit, AiOutlineForm, AiFillLock, AiFillCodeSandboxSquare, AiFillPicture } from "react-icons/ai";
import { AiFillTool, AiFillAppstore } from "react-icons/ai";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

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
          <MenuItem icon={<AiFillAppstore />}>View All</MenuItem>
        </SubMenu>
  
  
          <SubMenu title="My Page" icon={<AiFillCrown />}>
            


           <MenuItem icon={<AiOutlineForm />} ><button onClick={() =>  clickPost() }>Create</button></MenuItem> 

           <MenuItem icon={<AiOutlineForm />} ><Link to="/postCreate">Create</Link></MenuItem> 
      
            
            <MenuItem icon={<AiFillPicture />}>Gellery</MenuItem>
            <MenuItem icon={<FaHeart />}>Interest</MenuItem>
            <MenuItem icon={<AiFillLock />}>Secret</MenuItem>

          </SubMenu>
  
          <SubMenu title="Admin" icon={< AiFillTool/>} >
            <MenuItem icon={<AiFillSignal />}>Dash Board</MenuItem>
          </SubMenu>

            <div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
          
        <MenuItem icon={<AiOutlineLogout />}>Logout</MenuItem>
  
        
        </Menu>


      </ProSidebar>

 
        <Routes>
      <Route path="/postCreate" exact element={<PostCreateComponent />} />
      </Routes>

      </div>


    );
  };
  
  export default SideNavigation;