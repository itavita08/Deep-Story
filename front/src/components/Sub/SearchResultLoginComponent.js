import React from "react";
import Paging from "../Paging/Paging";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import Card from "../CardGroup/Card";
import { useLocation } from "react-router-dom";

function SearchResultLoginComponent(props) {
  const location = useLocation();

  const [items, setItems] = React.useState(location.state.result);
  const [count, setCount] = React.useState(0);
  const [currentpage, setCurrentpage] = React.useState(1);
  const [postPerPage] = React.useState(2);

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
    <div className="App">
      <LoginHeader></LoginHeader>
      <SidebarAll />

      {currentPosts && items.length > 0
        ? currentPosts.map((post) =>
            post.image === null ? (
              <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                  <div className="col-md-4" key={post.postId}>
                    <Card
                      postId={post.postId}
                      imageSource="/static/image/noimage.png"
                      title={post.title}
                      text={post.content}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="container d-flex justify-content-center align-items-center h-100">
                <div className="row">
                  <div className="col-md-4" key={post.postId}>
                    <Card
                      postId={post.postId}
                      imageSource={
                        `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
                        post.image +
                        `.png`
                      }
                      title={post.title}
                      text={post.content}
                    />
                  </div>
                </div>
              </div>
            )
          )
        : alert("찾으시는 게시글은 존재하지 않습니다.")}
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  );
}

export default React.memo(SearchResultLoginComponent);
