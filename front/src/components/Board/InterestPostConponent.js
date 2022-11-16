import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import Paging from "../Paging/Paging";

const InterestPostConponent = () => {
  const [items, setItems] = useState([]);
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1);
  const [postPerPage] = React.useState(9);
  const [indexOfLastPost, setIndexOfLastPost] = React.useState(
    currentpage * postPerPage
  );
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(
    indexOfLastPost - postPerPage
  );
  const [currentPosts, setCurrentPosts] = React.useState(
    items.slice(indexOfFirstPost, indexOfLastPost)
  );

  const setPage = (e) => {
    setCurrentpage(e);
  };

  const getInterestPost = async () => {
    await axios.get("/api/v1/board/interest").then((response) => {
      response.data.map((a) => {
        items.push(a);
      });
      setCount(response.data.length);
      setIndexOfLastPost(currentpage * postPerPage);
      setIndexOfFirstPost(indexOfLastPost - postPerPage);
      setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    });
  };

  useEffect(() => {
    getInterestPost();
  }, []);

  return (
    <div class="interest-list">
      <LoginHeader></LoginHeader>
      <SidebarAll></SidebarAll>

      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
          <div
            class="interest-image"
            style={{ float: "left", background: "none" }}
          >
            <img
              key="1"
              class="card-img-top"
              style={{ lheight: 200, width: 300 }}
              src={
                `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                item.image +
                `.png`
              }
            />

            <div class="interest-body">
              <h4 class="interest-title">{item.title}</h4>
            </div>
          </div>
        ))
      ) : (
        <div>좋아요를 누른 게시물이 없습니다.</div>
      )}

      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  );
};

export default InterestPostConponent;
