// import { useState } from "react";
// import { AiOutlineMenu } from "react-icons/ai";
// import { FaGem, FaHeart } from "react-icons/fa";
// import {
//   Menu,
//   MenuItem,
//   ProSidebar,
//   SidebarHeader,
//   SubMenu
// } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";

// import { Link } from "react-router-dom";

// const SideNavigation = () => {
//     const [collapsed, setCollapsed] = useState(false);
  
//     // added styles
//     const styles = {
//       sideBarHeight: {
//         height: "100vh"
//       },
//       menuIcon: {
//         float: "right",
//         margin: "10px"
//       }
//     };
//     const onClickMenuIcon = () => {
//       setCollapsed(!collapsed);
//     };
//     return (
//       <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
        
//         <SidebarHeader>
  
//           <div style={styles.menuIcon} onClick={onClickMenuIcon}>
//             <AiOutlineMenu />
//           </div>
  
//         </SidebarHeader>
  
//         <Menu iconShape="square">
  
//         <SubMenu title="Home" icon={<FaHeart />}>
//           <MenuItem icon={<FaGem />}>View All</MenuItem>
//         </SubMenu>
  
  
//           <SubMenu title="Reports" icon={<FaHeart />}>
//             <MenuItem>Create</MenuItem>
//             <MenuItem>Interest</MenuItem>
//             <MenuItem>Secret</MenuItem>
//           </SubMenu>
  
//           <SubMenu title="Admin" icon={<FaHeart />}>
//             <MenuItem>Dash Board</MenuItem>
//           </SubMenu>
  
//           <SubMenu title="Email" icon={<FaHeart />}>
//             <MenuItem>Notification</MenuItem>
//           </SubMenu>
  
//         </Menu>
//       </ProSidebar>
//     );
//   };
  
//   export default SideNavigation;