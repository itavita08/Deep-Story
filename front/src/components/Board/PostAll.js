/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Card from "../CardGroup/Card";
import Paging from "./Paging";



function AccountPostAll() {
  let items = []; //리스트에 나타낼 아이템
  let count = 0;
  const [currentpage, setCurrentpage] = useState(1); //현재페이지
  let postPerPage = 9;
  let indexOfLastPost = 0;
  let indexOfFirstPost = 0;
  let currentPosts = [];

  const setPage = (e) => {
    setCurrentpage(e);
  };

  const getPost = async() => {
    await axios.post("http://localhost:8080/postAll", {
    })
      .then(
        res => {
          console.log(res.data);
          res.data.map(a => items.push(a));
          console.log(items);
          count = items.length;
          console.log(count);
          indexOfLastPost = currentpage * postPerPage;
          console.log(indexOfLastPost);
          indexOfFirstPost = indexOfLastPost - postPerPage;
          console.log(indexOfFirstPost);
          currentPosts = items.slice(indexOfFirstPost, indexOfLastPost);
          console.log(currentPosts.length);

        }
      )
  };
  
  
  useEffect(() => {
    
    getPost();    
  })


  return (
    <div>
      {currentPosts && items.length > 0 ? (
        currentPosts.map((item) => (
            <div className="container d-flex justify-content-center align-items-center h-100">
              <div className="row">
                <div className="col-md-4" key={item.postId}>
                  <Card postId={item.postId} imageSource={"/static/image/" + item.image + ".png"} title={item.title} text={item.content} />
                </div>
              </div>
            </div>
        ))
      )
        : <div>게시물이 없습니다.</div>
      }
      <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
  )

}

export default AccountPostAll;