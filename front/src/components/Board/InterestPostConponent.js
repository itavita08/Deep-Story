import React, { useEffect, useState } from "react";
import axios from 'axios';
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from '../Header/LoginHeader';
import Paging from "../Paging/Paging";


const InterestPostConponent = () => {
  const [items, setItems] = useState([]); //리스트에 나타낼 아이템
  const [count, setCount] = React.useState(0); //아이템 총 개수
  const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
  const [postPerPage] = React.useState(9); //페이지당 아이템 개수

  const [indexOfLastPost, setIndexOfLastPost] = React.useState(currentpage * postPerPage);
  const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(indexOfLastPost - postPerPage);
  const [currentPosts, setCurrentPosts] = React.useState(items.slice(indexOfFirstPost, indexOfLastPost));

  const setPage = (e) => {
    setCurrentpage(e);
  };


  const getInterestPost = async() => {
    await axios.get('http://localhost:8080/getInterestPost')
    .then(
      response => {
        console.log(response.data);
        response.data.map(a => {
          items.push(a);
        })
        setCount(response.data.length);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
      }
    )
  }

  useEffect(() => {
    getInterestPost();
  },[])

  return(
    <div class="interest-list">
      <LoginHeader></LoginHeader>
        <SidebarAll></SidebarAll>
      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
          <div class="interest-image" style={{float:'left' , background:'none'}}>
            <img key="1" class="card-img-top" style={{
                height: 200,
                width: 300
            }} src={"/static/image/"+item.image+".png"}/>
            <div class="interest-body">
            <h4 class="interest-title">{item.title}</h4>
          </div>
          </div>
        ))
      )
        : (<div>좋아요를 누른 게시물이 없습니다.</div>)
      }
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  )

}

export default InterestPostConponent;