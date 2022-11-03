import React, { useEffect, useState} from 'react';

import axios from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';

import Card from "../CardGroup/Card";



function MypageComponent(props) {

    const [accountEmail, setAccountEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountGender, setAccountGender] = useState("");
    const [accountDate, setAaccountDate] = useState("");

    const [postCount, setPostCount] = useState(0);

    const [postList, setPostList] = useState([]);


    

    const navigate = useNavigate();

    const getProfil = async() => {
        await axios.get("http://localhost:8080/getProfil")
          .then(
            response => {
              console.log(response.data);
              setAccountEmail(response.data.accountEmail);
              setAccountName(response.data.accountName);
              setAaccountDate(response.data.accountDate);
              setAccountGender(response.data.accountGender);
            }
          )
        };


    const getPostList = async() => {
      await axios.get("http://localhost:8080/getPostListbyUser")
      .then(
        response => {
           console.log(response.data);
          // console.log(response.data.length);
          setPostCount(response.data.length);
          setPostList(response.data)
        }
        )
        }
      
    useEffect(() => {
        getProfil();
        getPostList();

        
    },[]
    )

  
    return (

        <div className='App'>

        <div>
        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>
  
        <h1> 프로필 </h1>
        <h5> Email : {accountEmail} </h5>
        <h5> Name : {accountName} </h5>
        <h5> Gender : {accountGender} </h5>
        <h5> Birth : {accountDate} </h5>


        <button id="updateProfil" onClick={() => navigate("/updateProfil", {
            state: {
              Email : accountEmail,
              Name : accountName,
              Gender : accountGender,
              Birth : accountDate
            }}) 
          }>

      <p>회원 정보 수정</p>
        </button>
        </div>

        <button id = "createPost" onClick={() => navigate("/postCreate")}>글 쓰기</button>



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
      }
     

  
        </div>
     
    );

}

export default React.memo(MypageComponent);




