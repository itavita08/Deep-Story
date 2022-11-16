import React from "react";
import DeleteImage from "./DeletelmageComponent";

const ImageLoad = ({ data, onDelete }) => {
  return data.map((it, idx) => {
    return <DeleteImage key={idx} {...it} onDelete={onDelete} />;
  });
};

export default ImageLoad;
