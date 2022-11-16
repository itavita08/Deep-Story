import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./card.scss";

function SecretCard({ secretPostId, imageSource, title, text, url }) {
  const navigate = useNavigate();

  const onClickImg = () => {
    navigate(
      "/secret/read",
      {
        state: {
          postId: secretPostId,
        },
      },
      { replace: false }
    );
  };

  return (
    <div className="card text-center bg-dark animate__animated animate__fadeInUp">
      <div className="overflow">
        <img
          src={imageSource}
          alt="a wallpaper"
          className="card-img-top"
          onClick={onClickImg}
        />
      </div>
      <div className="card-body text-light">
        <h4 className="card-title" onClick={onClickImg}>
          {title}{" "}
        </h4>
      </div>
    </div>
  );
}

SecretCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

export default SecretCard;
