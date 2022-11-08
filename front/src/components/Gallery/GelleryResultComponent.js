import React from 'react';
import Paging from '../Paging/Paging';
import SidebarAll from '../Sidebar/SidebarAllComponent';
import LoginHeader from '../Header/LoginHeader';
import GalleryCard from './GalleryCard';
import { useLocation } from 'react-router-dom';
import './GelleryResultComponent.css';

function GelleryResultComponent(props) {

    const location = useLocation();


    console.log("확인")
    console.log(location.state.result)

    const [items, setItems] = React.useState(location.state.result) //리스트에 나타낼 아이템
    const [count, setCount] = React.useState(0); //아이템 총 개수
    const [currentpage, setCurrentpage] = React.useState(1); //현재페이지
    const [postPerPage] = React.useState(9); //페이지당 아이템 개수
    
    const [indexOfLastPost, setIndexOfLastPost] = React.useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = React.useState(0);
    const [currentPosts, setCurrentPosts] = React.useState(0);

    React.useEffect(() => {
    setCount(items.length);

    console.log("-------------------카운트 -----------------------------------")
    console.log(count);
    setIndexOfLastPost(currentpage * postPerPage);
    console.log(indexOfLastPost)
    
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    console.log(indexOfFirstPost)
    
    setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    

    }, [currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage]);


    const setPage = (e) => {
    setCurrentpage(e);
    };

    return (

        <div >

        <LoginHeader></LoginHeader>
        <SidebarAll></SidebarAll>
        <div className="post-list">
      {  (currentPosts && items.length > 0) 
      ?(
       currentPosts.map((post)=> (
        
        (post.image === null)
        ?(
          <div className="row">
            <div className="post-image" key={post.postId}>
              <GalleryCard imageSource="/static/image/noimage.png" />
            </div>
          </div>
        ):(
          <div className="row">
            <div className="post-image" key={post.postId}>
              <GalleryCard imageSource={"/static/image/"+ post +".png"} />
            </div>
          </div>
        )

        ))):(
          <p>게시물이 존재하지 않습니다.</p>
            )
        }
        </div>
        <Paging page={currentpage} count={count} setPage={setPage} />
  </div>
    
);

     


}

export default React.memo(GelleryResultComponent);



