import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GetGelleryComponent(props) {
  const navigate = useNavigate();

  const getProfil = async () => {
    await axios.get("/api/v1/board/gallery").then((response) => {
      navigate(
        "/gellery",
        {
          state: {
            result: response.data,
          },
        },
        { replace: false }
      );
    });
  };

  useEffect(() => {
    getProfil();
  }, []);

  return <div className="Gallery"></div>;
}

export default React.memo(GetGelleryComponent);
