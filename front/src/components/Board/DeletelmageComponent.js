import React from "react";

const DeleteImage = ({ onDelete, name }) => {
  return (
    <div>
      <img
        key={name}
        style={{ height: -100, width: 500 }}
        src={
          `https://deep-story-bucket-01.s3.ap-northeast-2.amazonaws.com/` +
          name +
          `.png`
        }
      />
      <a
        className="close"
        href="/"
        data={name}
        onClick={(e) => {
          e.preventDefault();
          onDelete(name);
        }}
      >
        x
      </a>
    </div>
  );
};

export default DeleteImage;
