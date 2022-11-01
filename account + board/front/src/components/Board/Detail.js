
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'

function Detail(){
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState("");
  const state = useLocation();
 
  
  const getPost = async() => {
    await axios.post("http://localhost:8080/postDetail", {
      postId:1
      })
      .then(
        data => {
          console.log(data.data);
          setTitle(data.data['postName'])
          setContents(data.data['postContents'])
          //setPostId(state.state); 
        }
      )
    };

  useEffect(() => {
     setPostId(state.state); 

    setPostId();
    console.log(postId);
    getPost();
    
  }
  )



  return (

    
    <div>

        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>

      <h1>게시물 상세 페이지</h1>
      <h3> title : {title}</h3>
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )

}

export default Detail;