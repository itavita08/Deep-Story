import React, { useState, useEffect } from "react";
import Card from "../CardGroup/Card";
import Paging from "../Paging/Paging";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import Item from "antd/lib/list/Item";
import "./PostAllViewLogin.css";

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
      <LoginHeader></LoginHeader>
      <SidebarAll />

      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
          <Grid container spacing={2}>
            <Grid container item spacing={4}>
              <React.Fragment>
                <Grid item xs={4} s>
                  <div className="postAllView">
                    <Item>
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
                    </Item>
                  </div>
                </Grid>
              </React.Fragment>
            </Grid>
          </Grid>
        ))
      ) : (
        <div>게시물이 없습니다.</div>
      )}
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  );
}

export default React.memo(PostAllView);
