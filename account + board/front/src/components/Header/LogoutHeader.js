import "../../css/Header.scss"
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from '../Account/LoginComponent';
import { useNavigate } from 'react-router-dom';


export default function Header() {

  const navigate = useNavigate();



  return (
    <header className="header">

      <h2>Deep Story</h2>


      <div className="search">
        <input type="text" placeholder="검색" id="searchbar" />
      </div>

        
        <button id="b_search">
          <p>검색</p>
        </button>

        <div className="login">
        <button id="b_login" onClick={() => navigate("/login")}>
          <p>로그인</p>
        </button>


      </div>





    </header>
  );
}
