import React, { useEffect, useState} from 'react';

import axios from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAll from '../Sidebar/SidebarAllComponent';
import LoginHeader from '../Header/LoginHeader';

import MypageComponent from '../Sub/MypageComponent';

import Card from "../CardGroup/Card";


function GetGelleryComponent(props) {



const navigate = useNavigate();

const getProfil = async() => {
    await axios.get("http://localhost:8080/gallery")
      .then(
        response => {
          console.log(response.data[0]);
          navigate("/gelleryResult",{
            state: {
              result :response.data 
            }
          },{ replace: false})
        }
      )
    };

    useEffect(() => {
        getProfil();
        
    },[]
    )


    return (

        <div className='Gallery'>
        </div>
     
    );

}

export default React.memo(GetGelleryComponent);