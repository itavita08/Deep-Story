
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'

function Detail(){
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState(location.state.postId);
 
  
  const getPost = async() => {
    // e.preventDefault();
    await axios.post("http://localhost:8080/postDetail", {
      postId:postId
      })
      .then(
        data => {
          console.log(data.data); 
          setTitle(data.data.title)
          setContents(data.data.content)
          setImage(data.data.image)

        }
      )  
    };

    useEffect(() => {
      // setPostId(location.state.postId); 
      console.log(postId);
      getPost(); 
    },[] );



  return (

    
    <div>

        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>

        <div>
          <h1>게시물 상세 페이지</h1>
          <h3> title : {title}</h3>
          <div dangerouslySetInnerHTML={{ __html: contents }} />
          <img key={image} style={{
                    height: -100,
                    width: 500
                }} src={"/static/image/"+image+".png"}/>
      </div>
      
    </div>

  )

}

export default Detail;