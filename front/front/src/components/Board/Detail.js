/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Detail(){
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState(location.state.postId);

  const navigate = useNavigate();

 

  const getPost = async() => {
    await axios.post("http://localhost:80/postDetail", {
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
    console.log(postId);
    getPost(); 
  },[] );


  const updatePost = () => {
    navigate("/update",{
      state: {
        postId : postId
      }
    },{
      replace: false})
    }; 
    

  const deletePost = async() => {
    await axios.post("http://localhost:80/postDelete", {
      postId:postId
      })
      .then(
        response => {
          console.log(response.data);
          response.data.result === "true" ?  navigate("/",{
          replace: false}) :  alert("다시 시도해 주세요")
        }
      )  
    }; 


  return (
    <div>
      <h1>게시물 상세 페이지</h1>
      <h3> title : {title}</h3>
      <div dangerouslySetInnerHTML={{ __html: contents }} />
      <img key={image} style={{
                height: -100,
                width: 500
            }} src={"/static/image/"+image+".png"}/><br/>
      <button type='button' onClick={() => updatePost()}> 포스트 수정 </button> <button type='button' onClick={() => deletePost()}> 포스트 삭제 </button>
    </div>
  )
}



export default Detail;