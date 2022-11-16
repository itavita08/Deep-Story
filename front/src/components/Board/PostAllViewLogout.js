import React, { useEffect, useState } from "react";
import Card from "../CardGroup/Card";
import Paging from "../Paging/Paging";
import { useLocation } from "react-router-dom";

import SidebarLogoutComponent from "../Sidebar/SidebarLogoutComponent";
import LogoutHeader from "../Header/LogoutHeader";

function PostAllView() {
  const location = useLocation();
  const [items, setItems] = useState(location.state.data);
  const [count, setCount] = React.useState(items.length);
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

  useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  return (
    <div>
      <LogoutHeader></LogoutHeader>
      <SidebarLogoutComponent></SidebarLogoutComponent>

      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
          <div className="container d-flex justify-content-center align-items-center h-100">
            <div className="row">
              <div className="col-md-4" key={item.postId}>
                <Card
                  postId={item.postId}
                  imageSource={
                    `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                    item.image +
                    `.png`
                  }
                  title={item.title}
                  text={item.content}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  );
}

export default React.memo(PostAllView);
