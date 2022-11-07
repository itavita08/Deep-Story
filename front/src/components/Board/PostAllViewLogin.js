import React, { useEffect, useState } from "react";
import Card from "../CardGroup/Card";
import Paging from "../Paging/Paging";
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent'
import LoginHeader from '../Header/LoginHeader'
import Item from "antd/lib/list/Item";

function PostAllView(){
  const location = useLocation();
  const [items, setItems] = useState(location.state.data); //리스트에 나타낼 아이템
  const [count, setCount] = React.useState(items.length); //아이템 총 개수
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(9); //페이지{당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(currentpage * postPerPage);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(indexOfLastPost - postPerPage);
  const [currentPosts, setCurrentPosts] = React.useState(items.slice(indexOfFirstPost, indexOfLastPost));

  const setPage = (e) => {
    setCurrentpage(e);
  };

  React.useEffect(() => {
    setCount(items.length);
    setIndexOfLastPost(currentpage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);
 

  return(
    <div>

        <LoginHeader></LoginHeader>
        <SidebarAdminLoginComponent></SidebarAdminLoginComponent>

      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
          <Grid container spacing={2}>
            <Grid container item spacing={4}>
            <React.Fragment>
        
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        {/* <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
        </Grid> */}

      </React.Fragment>
          </Grid>
          </Grid>
          // <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8 }}>
          //   {Array.from(Array(1)).map((_, index) => (
          //     <Grid item xs={2} sm={2} md={2} key={index}>
          //       <Item><Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} /></Item>
          //       </Grid>
          //   ))}
            
            // <div className="container d-flex justify-content-center align-items-center h-100">
            //   <div className="row">
            //     <div className="col-md-4" key={item.postId}>
            //       <Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} />
            //     </div>
            //   </div>
            // </div>
            // </Grid>
        ))
      )
        : <div>게시물이 없습니다.</div>
      }
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>


  )

}

export default React.memo(PostAllView);