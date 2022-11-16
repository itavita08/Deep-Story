import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./card.scss";

function Card({ postId, imageSource, title, text, url }) {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(
      "/read",
      {
        state: {
          postId: postId,
        },
      },
      { replace: false }
    );
  };

  return (
    <div class="grid-container">
      <div class="item-a">
        <div class="grid-col">
          <img src={imageSource} alt="" />
          <div class="body-content">
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#" onClick={onClickImg} class="round-btn">
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

export default Card;
