import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import ModalView from "../Friendrequest/ModalView";
import "./Detail.css";
import purify from "dompurify";

function Detail() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");
  const [postId, setPostId] = useState(location.state.postId);
  const [accountId, setaccountId] = useState("");
  const [likes, addLikes] = useState(0);
  const [checkId, setCheckId] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getPost = async () => {
    await axios
      .post("/api/v1/board/read", {
        postId: postId,
      })
      .then((data) => {
        setTitle(data.data.title);
        setContents(data.data.content);
        setImage(data.data.image);
        setUserEmail(data.data.email);

        if (data.data.result === "true") {
          setCheckId(true);
        }
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const updatePost = () => {
    navigate(
      "/white",
      {
        state: {
          postId: postId,
        },
      },
      {
        replace: false,
      }
    );
  };

  const deletePost = async () => {
    await axios
      .post("/api/v1/board/delete", {
        postId: postId,
      })
      .then((response) => {
        response.data.result === "true"
          ? navigate("/main", {
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

  return (
    <div className="Mains">
      <LoginHeader></LoginHeader>
      <SidebarAll></SidebarAll>
      <div>
        <article class="post">
          <div>
            <img
              key={image}
              style={{ height: -100 }}
              src={
                `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                image +
                `.png`
              }
            />
            <br />
          </div>
          <div class="post__container">
            <button class="post__category" onClick={openModal}>
              {userEmail}
            </button>
            <ModalView
              open={modalOpen}
              close={closeModal}
              header="공유 다이어리 친구 신청"
              data={userEmail}
            />
            <h1 class="post__header">
              <span>{title}</span>
            </h1>
            <div class="post__content">
              <div
                class="post__text"
                dangerouslySetInnerHTML={{ __html: purify.sanitize(contents) }}
              />
            </div>
            <div class="post__link">
              <div>
                <h2>
                  좋아요
                  <span onClick={() => LovePost(likes + 1)}> ❤️ </span> {likes}{" "}
                </h2>
              </div>
              <div>
                {checkId === true ? (
                  <div>
                    <button type="button" onClick={() => updatePost()}>
                      {" "}
                      포스트 수정{" "}
                    </button>{" "}
                    <button type="button" onClick={() => deletePost()}>
                      {" "}
                      포스트 삭제{" "}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Detail;
