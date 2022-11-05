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
  const [postList, setPostLsit] = useState([]);
  const [host, setHost] = useState({});
  const [guest, setGuest] = useState({});
  const navigate = useNavigate();




  useEffect(() => {
  }, [])
  // private int secretPostId;
	// private String secretPostName;
	// private String secretPostContents;
	// private int secretWriterId;
	// private int secretFriendId;
  //   private String secretImage;
  
  return(
    <div>
      <LoginHeader />
      <SidebarAdminLoginComponent />

      <button id = "createPost" onClick={() => navigate("/secrePostCreate")}>글 쓰기</button>
      
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