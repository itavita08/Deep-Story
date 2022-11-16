import React from "react";
import GenderPieChart from "./GenderPieChart";
import Total from "./Total";
import AgeChart from "./AgeChart";
import LoginChart from "./LoginChart";
import LoginHeader from "../Header/LoginHeader";
import axios from "axios";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import "../Header/Header.css";

function DashBoard() {
  const startAWS = async () => {
    await axios
      .get("/api/v1/admin/aws-flask-start")
      .then((Response) => {
        alert(Response.data.result);
      })
      .catch((error) => {
        alert("해당 서비스를 이용하실 수 없습니다.");
      });
  };

  const stopAWS = async () => {
    await axios
      .get("/api/v1/admin/aws-flask-stop")
      .then((Response) => {
        alert(Response.data.result);
      })
      .catch((error) => {
        alert("해당 서비스를 이용하실 수 없습니다.");
      });
  };

  return (
    <div>
      <div id="bar">
        <LoginHeader></LoginHeader>
        <SidebarAll></SidebarAll>
      </div>

      <div className="search">
        <h3>Flask AWS 서버 제어</h3>
        <button id="b_search" onClick={startAWS}>
          {" "}
          시작
        </button>
        <button id="b_search" onClick={stopAWS}>
          {" "}
          중지
        </button>

        <br></br>
        <br></br>
      </div>

      <div id="chart">
        <Total></Total>
        <br></br>
        <GenderPieChart></GenderPieChart>
        <br></br>
        <AgeChart></AgeChart>
        <br></br>
        <LoginChart></LoginChart>
        <br></br>
      </div>
    </div>
  );
}

export default DashBoard;
