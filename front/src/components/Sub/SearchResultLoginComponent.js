import React, { useEffect, useState} from 'react';
import Paging from '../Paging/Paging';
import axios from 'axios';
import {Route, Routes, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';

import Card from "../CardGroup/Card";
import { useLocation } from 'react-router-dom';



function SearchResultLoginComponent(props) {

    const location = useLocation();


    console.log("확인")

    const [items, setItems] = React.useState(location.state.result) //리스트에 나타낼 아이템
    const [count, setCount] = React.useState(0); //아이템 총 개수
    const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
    const [postPerPage] = React.useState(2); //페이지당 아이템 개수
    
    const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
    const [currentPosts, setCurrentPosts] = React.useState(0);

    React.useEffect(() => {
    setCount(items.length);

    console.log("-------------------카운트 -----------------------------------")
    console.log(count);
    setIndexOfLastPost(currentpage * postPerPage);
    console.log(indexOfLastPost)
    
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    console.log(indexOfFirstPost)
    
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));

    //console.log(currentPosts);
    

    }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);


    const setPage = (e) => {
    setCurrentpage(e);
    };

    return (

        <div className='App'>

        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>

      {  (currentPosts && items.length > 0) 
      ?(
       currentPosts.map((post)=> (
        
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

        ))):(
            console.log("아님!!!")
            )
        }
        <Paging page={currentpage} count={count} setPage={setPage} />
  </div>
    
);

    

}

export default React.memo(SearchResultLoginComponent);




