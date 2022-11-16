import "../../css/Header.scss";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
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
          "/searchboard",
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
      <Link to="/main" style={{ textDecoration: "none", color: "black" }}>
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
    </header>
  );
}
