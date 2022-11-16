import React from "react";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import MainPagebestPost from "./MainPagebestPost";
import maininfo from "../assets/maininfo.jpg";
import "./MainPageLoginComponent.css";

export default function MainPageLoginComponent(props) {
  return (
    <div className="App">
      <LoginHeader></LoginHeader>

      <SidebarAll />

      <img
        src={maininfo}
        width="70%"
        height="50%"
        style={{ float: "inline-start" }}
      />

      <div className="ttt" style={{ overflow: "scroll" }}>
        <MainPagebestPost />
      </div>
    </div>
  );
}
