
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function detail(){
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState("");
  const state = useLocation();
 
  useEffect(() => {
    setPostId(state.state); 
    console.log(postId);
    async function getPost(){
      await fetch("api/v2/test2", {
        method: 'POST',
        mode:"cors",
        headers:{
          'content-type':'application/json'
         },
        body: JSON.stringify(postId)
      })
      .then(
        response => response.json()
      ).then(
        data => {
          console.log(data);
          setTitle(data['postName'])
          setContents(data['postContents'])
        }
      )
    };
    getPost();
    
  })



  return (
    <div>
      <h1>게시물 상세 페이지</h1>
      <h3> title : {title}</h3>
      <div dangerouslySetInnerHTML={{ __html: contents }} />
    </div>
  )

}

export default detail;