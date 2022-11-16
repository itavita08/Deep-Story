import React from "react";
import Paging from "../Paging/Paging";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import GalleryCard from "./GalleryCard";
import { useLocation } from "react-router-dom";
import "./GelleryResultComponent.css";

function GelleryResultComponent(props) {
  const location = useLocation();

  const [items, setItems] = React.useState(location.state.result);
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1);
  const [postPerPage] = React.useState(9);

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
  const [currentPosts, setCurrentPosts] = React.useState(0);

  React.useEffect(() => {
    setCount(items.length);

    setIndexOfLastPost(currentpage * postPerPage);

    setIndexOfFirstPost(indexOfLastPost - postPerPage);

    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);

  const setPage = (e) => {
    setCurrentpage(e);
  };

  return (
    <div>
      <LoginHeader></LoginHeader>
      <SidebarAll></SidebarAll>
      <div className="post-list">
        {currentPosts && items.length > 0 ? (
          currentPosts.map((post) =>
            post.image === null ? (
              <div className="row">
                <div className="post-image" key={post.postId}>
                  <GalleryCard imageSource="/static/image/noimage.png" />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="post-image" key={post.postId}>
                  <GalleryCard
                    imageSource={
                      `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                      post +
                      `.png`
                    }
                  />
                </div>
              </div>
            )
          )
        ) : (
          <p>게시물이 존재하지 않습니다.</p>
        )}
      </div>
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  );
}

export default React.memo(GelleryResultComponent);
