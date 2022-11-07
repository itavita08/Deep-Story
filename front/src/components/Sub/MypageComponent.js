import React, { useEffect, useState} from 'react';

import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';

import SidebarAll from '../Sidebar/SidebarAllComponent';
import LoginHeader from '../Header/LoginHeader';

import Card from "../CardGroup/Card";
import SecretFriendModal from './SecretFriendModal';



function MypageComponent(props) {

    const [accountEmail, setAccountEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [accountGender, setAccountGender] = useState("");
    const [accountDate, setAaccountDate] = useState("");

    const [postCount, setPostCount] = useState(0);

    const [postList, setPostList] = useState([]);
    const [secretRequest, setSecretRequest] = useState([]);
    const [secretRequestCount, setSecretRequestCount] = useState(0);

    // 모달창 노출 여부 state
    const [modalOpen, setModalOpen] = useState(false);
    
    // 모달창 노출
    const openModal = () => {
    setModalOpen(true);
    };
    //모달창 닫기 
    const closeModal = () => {
     setModalOpen(false);
    };

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
        
    const getAlarm = async() => {
      await axios.get("http://localhost:8080/secretAlarm")
      .then(
        response => {
          const data = JSON.stringify(response.data)
          const data2 = JSON.parse(data);
          data2.map(a => {
            secretRequest.push(a);
          })
          setSecretRequestCount(data2.length);
          console.log(secretRequest);
          console.log(secretRequestCount);
        }
      )
    }
    
    const getPostList = async() => {
      await axios.get("http://localhost:8080/getPostListbyUser")
      .then(
        response => {
           console.log(response.data);
          // console.log(response.data.length);
          setPostCount(response.data.length);
          setPostList(response.data);
        }
      )
    }
      
    useEffect(() => {
      getAlarm(); 
      getProfil();
      getPostList();
              
    },[])

  
    return (

        <div className='App'>

        <div>
        <LoginHeader></LoginHeader>
        <SidebarAll></SidebarAll>
  
        { secretRequestCount !== 0 ?(
        <div>
          <br/>
          <input alt='alarm' type='image'  style={{width:30, height:30}} src='/static/alarm/alarm1.png' 
          onClick={openModal} />
          <SecretFriendModal open={modalOpen} close={closeModal} header='공유 다이어리 신청한 친구 목록' data={secretRequest} />
        </div>
      ) : (
        <div>
          친구 신청 : 
          <input alt='no-alarm' type='image'  style={{width:30, height:30}} src='/static/alarm/alarm.png' />
        </div>
      )}
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











