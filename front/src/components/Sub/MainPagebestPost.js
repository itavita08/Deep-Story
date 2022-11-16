import axios from "axios";

import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./MainPagecss.css";
import purify from "dompurify";

function MypageCard() {
  const [list, setList] = useState([
    {
      title: "",
      content: "",
      image: "",
      postId: "",
    },
    {
      title: "",
      content: "",
      image: "",
      postId: "",
    },
    {
      title: "",
      content: "",
      image: "",
      postId: "",
    },
  ]);
  const navigate = useNavigate();

  const getbestPost = async () => {
    await axios.get("/api/v1/board/best").then((data) => {
      setList([
        {
          ...list,
          title: data.data.key0.title,
          content: data.data.key0.content,
          image: data.data.key0.image,
          postId: data.data.key0.postId,
        },
        {
          ...list,
          title: data.data.key1.title,
          content: data.data.key1.content,
          image: data.data.key1.image,
          postId: data.data.key1.postId,
        },
        {
          ...list,
          title: data.data.key2.title,
          content: data.data.key2.content,
          image: data.data.key2.image,
          postId: data.data.key2.postId,
        },
      ]);
    });
  };

  const detailPage = (p) => {
    navigate(
      "/read",
      {
        state: {
          postId: p,
        },
      },
      {
        replace: false,
      }
    );
  };

  useEffect(() => {
    getbestPost();
  }, [setList]);

  return (
    <div class="card-group">
      <div>
        <h2>상위 게시물</h2>

        <div
          class="card"
          style={{ float: "left" }}
          onClick={() => {
            detailPage(parseInt(list[0].postId));
          }}
        >
          <img
            key="1"
            class="card-img-top"
            style={{
              height: 200,
              width: 300,
            }}
            src={
              `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
              list[0].image +
              `.png`
            }
          />
          <div class="card-body">
            <h5 class="card-title">title:{list[0].title}</h5>
            <div
              class="card-text"
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(list[0].content),
              }}
            />
          </div>
        </div>

        <div
          class="card"
          style={{ float: "left" }}
          onClick={() => {
            detailPage(parseInt(list[1].postId));
          }}
        >
          <img
            key="2"
            class="card-img-top"
            style={{
              height: 200,
              width: 300,
            }}
            src={
              `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
              list[1].image +
              `.png`
            }
          />
          <div class="card-body">
            <h5 class="card-title">title:{list[1].title}</h5>
            <div
              class="card-text"
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(list[1].content),
              }}
            />
          </div>
        </div>

        <div
          class="card"
          onClick={() => {
            detailPage(parseInt(list[2].postId));
          }}
        >
          <img
            key="3"
            class="card-img-top"
            style={{
              height: 200,
              width: 300,
            }}
            src={
              `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
              list[2].image +
              `.png`
            }
          />
          <div class="card-body">
            <h5 class="card-title">title:{list[2].title}</h5>
            <div
              class="card-text"
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(list[2].content),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MypageCard;
