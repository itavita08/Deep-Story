import React, { useEffect, useState} from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';
import Card from "../CardGroup/Card";
import SecretPostCreateComponent from "./SecretPostCreateComponent";
const SecretList = () => {

  const location = useLocation();
  // const [postList, setPostLsit] = useState(location.state.postList);
  // const [secretFriendId, setSecretFriendId] = useState(location.state.secretFriendId);
  // const [friendEmail, setFriendEmail] = useState(location.state.friendEmail);
  const [postList, setPostLsit] = useState([]);
  const [myAccount, setMyAccount] = useState(location.state.myAccount);
  const [friendAccount, setFriendAccount] = useState(location.state.friendAccount);

  const navigate = useNavigate();


  useEffect(() => {
    // getFriendPost(secretFriendId);
  }, [])

  return(
    <div>
      <LoginHeader />
      <SidebarAdminLoginComponent />

      <h1> 프로필 </h1>
        <h5> My Email : {myAccount.friendEmail} </h5>
        <h5> My Name : {myAccount.friendName} </h5>

        <h5> Friend Email : {friendAccount.friendEmail} </h5>
        <h5> Friend Name : {friendAccount.friendName} </h5>
  

      <button id = "createPost" onClick={(e) => navigate("/secrePostCreate", {state: {friend:friendAccount}})}>글 쓰기</button>
      
      {postList.length === 0 ? (
          <div>목록이 존재하지 않습니다.</div>
        ): (
          postList.map((post) => (
            (post.image === null)
            ?(
              <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                <div className="col-md-4" key={post.secretPostId}>
                  <Card postId = {post.secretPostId} imageSource="/static/image/noimage.png" title={post.secretPostName} text={post.secretPostContents}/>
                </div>
              </div>
            </div>
            ):(
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                <div className="col-md-4" key={post.secretPostId}>
                  <Card postId = {post.secretPostId} imageSource={"/static/image/"+ post.secretImage +".png"} title={post.secretPostName} text={post.secretPostContents}/>
                </div>
              </div>
            </div>
            )
            ))
        )}

    </div>
  )
}

export default SecretList;