import "../../css/Header.scss";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function LogoutHeader() {
  const [state, setState] = useState({
    keyword: "",
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();

  const searchClicked = async () => {
    const keyword = state.keyword;

    console.log(keyword);

    await axios
      .post("/api/v1/board/search", {
        keyword: keyword,
      })
      .then((response) => {
        navigate(
          "/search",
          {
            state: {
              result: response.data,
            },
          },
          { replace: false }
        );
      });
  };

  return (
    <header className="header">
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <h2>Deep Story</h2>
      </Link>

      <div className="search">
        <input
          type="text"
          placeholder="검색"
          id="searchbar"
          name="keyword"
          value={state.keyword}
          onChange={handleChange}
        />
        <button id="b_search" onClick={searchClicked}>
          <p>검색</p>
        </button>
      </div>
      <h1> Draw your story</h1>

      <div className="login">
        <button id="b_login" onClick={() => navigate("/login")}>
          <p>로그인</p>
        </button>
      </div>

      <div className="sign">
        <button id="b_sign" onClick={() => navigate("/sign")}>
          <p>회원가입</p>
        </button>
      </div>
    </header>
  );
}
