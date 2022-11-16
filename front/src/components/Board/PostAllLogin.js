import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PostAllLogin() {
  const navigate = useNavigate();

  const getPost = async () => {
    await axios
      .get("/api/v1/board/all")
      .then((response) => {
        console.log(response.data);

        if (response != null) {
          navigate(
            "/boardall",
            {
              state: {
                data: response.data,
              },
            },
            { replace: false }
          );
        }
      })
      .catch((err) => {
        alert("게시글이 존재하지 않습니다.");
      });
  };

  useEffect(() => {
    getPost();
  }, []);
}

export default React.memo(PostAllLogin);
