import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "../CardGroup/card.scss";

function GalleryCard({ postId, imageSource, title, text, url }) {
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
    <div className={"card"}>
      <div className="overflow">
        <img
          src={imageSource}
          alt="a wallpaper"
          className="card-img-top"
          onClick={onClickImg}
        />
      </div>
    </div>
  );
}

GalleryCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  url: PropTypes.string,
  imageSource: PropTypes.string,
};

export default GalleryCard;
