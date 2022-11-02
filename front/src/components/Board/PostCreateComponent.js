import React, { useState} from 'react';
import InputTextComponent from './InputTextComponent';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ImageLoad from './ImageloadComponent';
import { useNavigate } from 'react-router-dom';
import '../../main.css';

import styled from 'styled-components';
import { Layout, Menu } from 'antd';


function PostCreateComponent() {
  const [blogContent, setBlogContent] = useState({
    title: '',
    content: ''
  })
  const [image, setImage] = useState([]);

  const navigate = useNavigate();


  const getValue = e => {
    const name = e.currentTarget.name;
    const data = e.currentTarget.value;
    setBlogContent({
      ...blogContent,
      [name] : data
    })
  };

  const onDelete = (targetId) => {
    const newReportList = image.filter((it) => it.name !== targetId);	
    setImage(newReportList);
  };

  const _submitBoard = async(e) => {
    // e.preventDefault();
    const title = blogContent.title;
    const content = blogContent.content;
    if(title === "") {
      return alert('제목을 입력해주세요.');
    } else if(content === "") {
      return alert('내용을 입력해주세요.');
    }  
    await axios.post('http://localhost:8080/postInsert', {
        title,
        content,
        image
    })
    // .then(
    //   response => response.json()
    // 
    // .then(response => {
    //   console.log(response)
    // }
    // )
    .then(
      response =>{
      console.log(response);
        if(response != null){
        navigate("/Detail",{
        state: {
          postId : response.data.postId
        }
      },{ replace: false})}
      }
  )
  .catch(err => {
    console.log('Oh noooo!!');
    console.log(err);
  })
};

// const _submitBoard = async (e) => {
//   navigate("/detail",{
//     state:{
//       postId:10
//     }
//   })
// }

     return (

      <div className='Mains'>
        
      <LoginHeader></LoginHeader>     
      <SidebarAdminLoginComponent></SidebarAdminLoginComponent>
      

      <div className='Write'>
        <div className='image'>
        <InputTextComponent onCreate={(v)=>{
            if(image.length >= 1){
              alert("이미지는 한장만 가능합니다");
            }else {
            const imageList = {name:v}
              const copyImageList = [...image]
              copyImageList.push(imageList);
              setImage(copyImageList);
            }
          }}></InputTextComponent>
          <ImageLoad data={image} onDelete={onDelete}/>
          </div>      
        <form id='board_form'>
        <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' onChange={getValue} />
        <div>
        < ReactQuill 
            onChange={(event) => {
              setBlogContent({
                ...blogContent,
                content: event
              });
            }}
        />
        </div>
        <button type='button' onClick={() => _submitBoard()}> 포스트 등록 </button>
        </form>  
      </div>
      
      </div>
         );
  
        }
        
export default React.memo(PostCreateComponent);