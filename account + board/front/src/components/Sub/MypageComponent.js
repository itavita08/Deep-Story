import React, { useEffect, useState} from 'react';

import axios from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'




export default function MypageComponent(props) {

    const [accountEmail, setAccountEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountGender, setAccountGender] = useState("");
    const [ accountDate, setAaccountDate] = useState("");

    const navigate = useNavigate();

    const getProfil = async() => {
        await axios.post("http://localhost:8080/getProfil")
          .then(
            data => {
              console.log(data.data);
              setAccountEmail(data.data.accountEmail);
              setAccountName(data.data.accountName);
              setAccountGender(data.data.accountGender);
              setAaccountDate(data.data.accountDate);
            }
          )
        };

    useEffect(() => {
        getProfil();
    }
    )

  
    return (

        <div className='App'>

        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>
  
        <h1> 프로필 </h1>
        <h5> Email : {accountEmail} </h5>
        <h5> Name : {accountName} </h5>
        <h5> Gender : {accountGender} </h5>
        <h5> Birth : {accountDate} </h5>


        
        <button id="updateProfil" onClick={() => navigate("/updateProfil", {
            state: {
              Email : {accountEmail},
              Name : {accountName},
              Gender : {accountGender},
              Birth : {accountDate}
            }}) 
          }>
          <p>회원 정보 수정</p>
        </button>

        </div>
    );

}





