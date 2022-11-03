import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem, FaHeart } from "react-icons/fa";

import { AiFillCrown, AiFillSignal, AiFillHome, AiFillEdit, AiOutlineForm, AiFillLock, AiFillCodeSandboxSquare, AiFillPicture } from "react-icons/ai";
import { AiFillTool, AiFillAppstore } from "react-icons/ai";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";

import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import { Link } from "react-router-dom";

const SideNavigation = () => {
    const [collapsed, setCollapsed] = useState(false);
  
    // added styles
    const styles = {
      sideBarHeight: {
        height: "100vh",
        float: "left",
        margin: "10px"
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
            <MenuItem icon={<AiOutlineForm />}>Create</MenuItem>
            <MenuItem icon={<AiFillPicture />}>Gellery</MenuItem>
            <MenuItem icon={<FaHeart />}>Interest</MenuItem>
            <MenuItem icon={<AiFillLock />}>Secret</MenuItem>
          </SubMenu>

            <div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
          
        <MenuItem icon={<AiOutlineLogout />}>Logout</MenuItem>
  
        
        </Menu>
      </ProSidebar>



    );
  };
  
  export default SideNavigation;