import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

import "./card.css";

function Card({ postId, imageSource, title, text, url }) {

  const navigate = useNavigate();

  console.log("포스트아이디");
  console.log(postId);
  console.log(imageSource);


  const onClickImg = () => {
    navigate("/Detail",{
      state: {
        postId : postId
      }
    },{ replace: false})
  };


  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img src={imageSource} alt="a wallpaper" className="card-img-top" onClick={onClickImg}/>
      </div>
      <div className="card-body text-light">
        <h4 className="card-title"onClick={onClickImg} >{title} </h4>

        {/* <p className="card-text text-secondary">
          {text
            ? text
            : {text}}
        </p> */}
        {/* <a
          href={url ? url : "#!"}
          target="_blank"
          className="btn btn-outline-secondary border-0"
          rel="noreferrer"
        >
          Go to {title}
        </a> */}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string
};

export default Card;
