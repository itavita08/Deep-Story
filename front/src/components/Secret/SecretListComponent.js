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
  const [secretFriendId, setSecretFriendId] = useState(location.state.secretFriendId);
  const [friendEmail, setFriendEmail] = useState(location.state.friendEmail);
  const [postList, setPostLsit] = useState([]);
  const [myAccount, setMyAccount] = useState({
    // secretFriendId : 0,
    // friendId : 0,
    // friendEmail : "",
    // friendName : ""
  });
  const [friendAccount, setFriendAccount] = useState({
    // secretFriendId : 0,
    // friendId : 0,
    // friendEmail : "",
    // friendName : ""
  });

  // const [myAccount, setMyAccount] = useState({
  //   secretFriendId:location.state.myAccount.secretFriendId,
  //   friendId:location.state.myAccount.friendId,
  //   friendEmail:location.state.myAccount.friendEmail,
  //   friendName: location.state.myAccount.friendName
  // });
  // const [friendAccount, setFriendAccount] = useState({
  //   secretFriendId:location.state.friendAccount.secretFriendId,
  //   friendId:location.state.friendAccount.friendId,
  //   friendEmail:location.state.friendAccount.friendEmail,
  //   friendName: location.state.friendAccount.friendName
  // });
  const navigate = useNavigate();

  const getFriendPost = async (id) => {

    await axios.post('http://localhost:8080/getSecretPostList', {
      secretFriendId:id
    })
    .then(
      response => {
        alert("getFriendPost response.data " + response.data);
        if(response.data === ""){
          navigate("/secretList", {
            state: {
              postList:[]
        }})
        }else{
          navigate("/secretList", {
            state: {
              postList:response.data
        }})
          }
        }
    )
  }
  const getFriendProfil = async(id, email) => {

    await axios.post('http://localhost:8080/getSecretProfil', {
      secretFriendId:id,
      FriendEmail: email
    })
    .then(
      response => {
        alert("getFriendProfil response.data " + response.data);
        navigate("/secretList", {
          state: {
            myAccount:response.data.myAccount,
            friendAccount: response.data.friendAccount
          }
        })})
  }



  useEffect(() => {
    getFriendPost(secretFriendId);
    getFriendProfil(secretFriendId, friendEmail);
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
  

      <button id = "createPost" onClick={(e) => navigate("/secrePostCreate", {state: {friend:secretFriendId}})}>글 쓰기</button>
      
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