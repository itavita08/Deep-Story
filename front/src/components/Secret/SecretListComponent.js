import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import SecretCard from "../CardGroup/SecretCard";
import "./SecretListComponent.css";

const SecretList = (props) => {
  const location = useLocation();

  const [postList, setPostLsit] = useState(location.state.postList);
  const [myAccount, setMyAccount] = useState(location.state.myAccount);
  const [friendAccount, setFriendAccount] = useState(
    location.state.friendAccount
  );

  const navigate = useNavigate();

  return (
    <div>
      <LoginHeader />
      <SidebarAll />

      <h1> 프로필 </h1>
      <h5> My Email : {myAccount.friendEmail} </h5>
      <h5> My Name : {myAccount.friendName} </h5>

      <h5> Friend Email : {friendAccount.friendEmail} </h5>
      <h5> Friend Name : {friendAccount.friendName} </h5>

      <button
        id="createPost"
        onClick={(e) =>
          navigate("/secret/save", { state: { friend: friendAccount } })
        }
      >
        글 쓰기
      </button>

      {postList.length === 0 ? (
        <div>목록이 존재하지 않습니다.</div>
      ) : (
        postList.map((post) =>
          post.secretImage === null ? (
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                <div className="col-md-4" key={post.secretPostId}>
                  <SecretCard
                    secretPostId={post.secretPostId}
                    imageSource="/static/image/noimage.png"
                    title={post.secretPostName}
                    text={post.secretPostContents}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                <div className="col-md-4" key={post.secretPostId}>
                  <SecretCard
                    secretPostId={post.secretPostId}
                    imageSource={
                      `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                      post.secretPostId +
                      `.png`
                    }
                    title={post.secretPostName}
                    text={post.secretPostContents}
                  />
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default SecretList;
