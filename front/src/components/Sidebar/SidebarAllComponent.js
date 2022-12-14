import React from "react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import {
  AiFillCrown,
  AiFillSignal,
  AiFillHome,
  AiOutlineForm,
  AiFillLock,
  AiFillPicture,
} from "react-icons/ai";
import { AiFillTool, AiFillAppstore } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

const SidebarAll = () => {
  const [collapsed, setCollapsed] = useState(false);
  const userType = sessionStorage.getItem("userType");

  const styles = {
    sideBarHeight: {
      height: "100vh",
      float: "left",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div>
      {userType === "admin" ? (
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
          <SidebarHeader>
            <div style={styles.menuIcon} onClick={onClickMenuIcon}>
              <AiOutlineMenu />
            </div>
          </SidebarHeader>

          <Menu iconShape="square">
            <SubMenu title="Home" icon={<AiFillHome />}>
              <MenuItem icon={<AiFillAppstore />}>
                <Link to="/getboardall">View All</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="My Page" icon={<AiFillCrown />}>
              <MenuItem icon={<AiOutlineForm />}>
                <Link to="/mypage">Profil</Link>
              </MenuItem>
              <MenuItem icon={<AiOutlineForm />}>
                <Link to="/save">Create</Link>
              </MenuItem>
              <MenuItem icon={<AiFillPicture />}>
                <Link to="/getgellery">Gellery</Link>
              </MenuItem>
              <MenuItem icon={<FaHeart />}>
                <Link to="/interest">Interest</Link>
              </MenuItem>
              <MenuItem icon={<AiFillLock />}>
                <Link to="/secretfriend">Secret</Link>
              </MenuItem>
            </SubMenu>

            <SubMenu title="Admin" icon={<AiFillTool />}>
              <MenuItem icon={<AiFillSignal />}>
                <Link to="/dashBoard">Dash Board</Link>
              </MenuItem>
            </SubMenu>

            <div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>

            <MenuItem icon={<AiOutlineLogout />}>
              <Link to="/logout">Logout</Link>
            </MenuItem>
          </Menu>
        </ProSidebar>
      ) : (
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
          <SidebarHeader>
            <div style={styles.menuIcon} onClick={onClickMenuIcon}>
              <AiOutlineMenu />
            </div>
          </SidebarHeader>
          <Menu iconShape="square">
            <SubMenu title="Home" icon={<AiFillHome />}>
              <MenuItem icon={<AiFillAppstore />}>
                <Link to="/postAllLogin">View All</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="My Page" icon={<AiFillCrown />}>
              <MenuItem icon={<AiOutlineForm />}>
                <Link to="/mypage">Profil</Link>
              </MenuItem>
              <MenuItem icon={<AiOutlineForm />}>
                <Link to="/postCreate">Create</Link>
              </MenuItem>
              <MenuItem icon={<AiFillPicture />}>
                <Link to="/getGellery">Gellery</Link>
              </MenuItem>
              <MenuItem icon={<FaHeart />}>
                <Link to="/interest">Interest</Link>
              </MenuItem>
              <MenuItem icon={<AiFillLock />}>
                <Link to="/secretMain">Secret</Link>
              </MenuItem>
            </SubMenu>
            <div>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
            <MenuItem icon={<AiOutlineLogout />}>
              <Link to="/logout">Logout</Link>
            </MenuItem>
          </Menu>
        </ProSidebar>
      )}
    </div>
  );
};

export default SidebarAll;
