import React, { useEffect, useState} from 'react';

import axios from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
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

        <div className='App'>

        {/* <div>
        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>
  

      {  postList.map((post) => (

        (post.image === null)
        ?(
          <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row">
            <div className="col-md-4" key={post.postId}>
              <Card postId = {post.postId} imageSource="/static/image/noimage.png" title={post.title} text={post.content}/>
            </div>
          </div>
        </div>
        ):(
        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="row">
            <div className="col-md-4" key={post.postId}>
              <Card postId = {post.postId} imageSource={"/static/image/"+ post.image +".png"} title={post.title} text={post.content}/>
            </div>
          </div>
        </div>
        )

        ))
      } */}
     

  
        </div>
     
    );

}

export default React.memo(GetGelleryComponent);
