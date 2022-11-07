import React, { useState } from "react";
import InputTextComponent from "../Board/InputTextComponent";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from '../Header/LoginHeader'
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ImageLoad from "../Board/ImageloadComponent";
import { useLocation, useNavigate } from 'react-router-dom';
import '../../main.css';
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const SecretPostCreateComponent = () => {
  const location = useLocation();
  const [blogContent, setBlogContent] = useState({
    title: '',
    content: ''
  })
  const navigate = useNavigate();
  const [secretImage, setImage] = useState([]);
  const [friendId, setFriendId] = useState(location.state.friendId);
  const [friendAccount, setFriendAccount] = useState([]);

  const getValue = e => {
    const name = e.currentTarget.name;
    const data = e.currentTarget.value;
    setBlogContent({
      ...blogContent,
      [name] : data
    })
  };

  const onDelete = (targetId) => {
    const newReportList = secretImage.filter((it) => it.name !== targetId);	
    setImage(newReportList);
  };

  const _submitBoard = async(e) => {
    // e.preventDefault();
    const secretTitle = blogContent.title;
    const secretContents = blogContent.content;
    if(secretTitle === "") {
      return alert('제목을 입력해주세요.');
    } else if(secretContents === "") {
      return alert('내용을 입력해주세요.');
    }  
    await axios.post('http://localhost:8080/secretPostInsert', {
      secretTitle,
      secretContents,
      secretImage,
      secretFriendId:3
    })
    .then(
      response =>{
      console.log(response.data);
        if(response != null){
        navigate("/secretDetail",{
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
  }

  return (
      <div className='Mains'>
        
        <LoginHeader></LoginHeader>     
        <SidebarAll/>
        
  
        <div className='Write'>
          <div className='image'>
          <InputTextComponent onCreate={(v)=>{
              if(secretImage.length >= 1){
                alert("이미지는 한장만 가능합니다");
              }else {
              const imageList = {name:v}
                const copyImageList = [...secretImage]
                copyImageList.push(imageList);
                setImage(copyImageList);
              }
            }}></InputTextComponent>
            <ImageLoad data={secretImage} onDelete={onDelete}/>
            </div>      
          <form id='board_form' style={{float: 'left'}}>
          <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' onChange={getValue} className="form-control mt-1" size={100}/>
          
          <label>                   </label>
          <label>                   </label>
         
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
          <label>                   </label>
          <label>                   </label>
          <div>
          <button class="btn btn-primary" type='button' onClick={() => _submitBoard()}> 포스트 등록 </button>
          </div>
          </form>  
        </div>

    </div>
  )

}

export default React.memo(SecretPostCreateComponent);