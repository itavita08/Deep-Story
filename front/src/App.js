
import React from 'react';

import { Link } from 'react-router-dom';


function App(props) {

  const isLoggedIn = props.isLoggedIn;

  if (!isLoggedIn) {
	return (
		<div className='App'>
      
      <h3>----- 메인 페이지 -----</h3>

      {/* <div>
        <SidebarMainLoginComponent></SidebarMainLoginComponent>
      </div> */}

      <img className="mainImage" src= "static/image/image.png" alt="mainImage01"  />  

      <div>
        <Link to="/">홈</Link>
        <p/>
        <Link to="/login">로그인</Link>
        <p/>
        <Link to="/sign">회원가입</Link>
        <p/>
        <Link to="/PostCreate">글 쓰기</Link>
        <p/>
        <Link to="/SendText">테스트</Link>
        <p/>
        <Link to="/postAll">모든 게시물</Link>
        <p/>
        <Link to="/Logout">로그아웃</Link>

      </div>

				
		</div>
	);
}
}


export default App;


