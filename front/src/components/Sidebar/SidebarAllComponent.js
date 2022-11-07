import React from "react";
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

const SidebarAll = () => {

}

export default SidebarAll;