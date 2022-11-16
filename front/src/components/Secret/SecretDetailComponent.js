import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import purify from "dompurify";
import "./SecretDetail.css";

const SecretDetailComponent = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState(location.state.postId);
  const [accountId, setaccountId] = useState("");
  const [likes, addLikes] = useState(0);
  const navigate = useNavigate();

  const getPost = async () => {
    await axios
      .post("/api/v1/secret/read", {
        secretPostId: postId,
      })
      .then((data) => {
        setTitle(data.data.title);
        setContents(data.data.content);
        setImage(data.data.image);
        setPostId(data.data.postId);
      });
  };

  const updatePost = () => {
    navigate(
      "/secret/white",
      {
        state: {
          secretPostId: postId,
        },
      },
      {
        replace: false,
      }
    );
  };

  const deletePost = async () => {
    await axios
      .post("/api/v1/secret/delete", {
        secretPostId: postId,
      })
      .then((response) => {
        response.data.result === "true"
          ? navigate("/secretlist", {
              replace: false,
            })
          : alert("다시 시도해 주세요");
      });
  };

  const LovePost = async () => {
    await axios
      .post("/api/v1/board/like", {
        accountId: accountId,
        postId: postId,
      })
      .then((data) => {
        addLikes(data.data.result);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="secretdetail">
      <LoginHeader></LoginHeader>
      <SidebarAll></SidebarAll>
      <div>
        <article className="secret_post">
          <div>
            <img
              key={image}
              style={{
                height: -100,
                width: 500,
              }}
              src={
                `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                image +
                `.png`
              }
            />
            <br />
          </div>
          <div className="secretpost__container">
            <div className="secretpost__content">
              <h1 className="secretpost_title">
                {" "}
                <span>{title}</span>
              </h1>
              <div
                class="secretpost__text"
                style={{ position: "relative", top: "500%", left: "25%" }}
                dangerouslySetInnerHTML={{ __html: purify.sanitize(contents) }}
              />
            </div>

            <div className="secretpost_ink">
              <h2>
                좋아요
                <span onClick={() => LovePost(likes + 1)}> ❤️ </span> {likes}
              </h2>
              <button type="button" onClick={() => updatePost()}>
                {" "}
                포스트 수정{" "}
              </button>{" "}
              <button type="button" onClick={() => deletePost()}>
                {" "}
                포스트 삭제{" "}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default React.memo(SecretDetailComponent);
