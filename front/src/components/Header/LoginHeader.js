
import "../../css/Header.scss"
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginComponent from '../Account/LoginComponent';

export default function Header() {


  return (
    <header className="header">

      <h2>Deep Story</h2>

      <div className="search">
        <input type="text" placeholder="검색" id="searchbar" />
      
         <button id="b_search" >
          <p>검색</p>
        </button>

      </div>

    </header>
  );
}
