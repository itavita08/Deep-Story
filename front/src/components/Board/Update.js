import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import InputTextComponent from "./InputTextComponent";
import ImageLoad from "./ImageloadComponent";
import ReactQuill from "react-quill";

function Update() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [postId, setPostId] = useState(location.state.postId);

  const navigate = useNavigate();

  const getPost = async () => {
    await axios
      .post("/api/v1/board/read", {
        postId: postId,
      })
      .then((data) => {
        setTitle(data.data.title);
        setContent(data.data.content);

        const imageList = { name: data.data.image };
        const copyImageList = [...image];
        copyImageList.push(imageList);
        setImage(copyImageList);
      });
  };

  const onDelete = (targetId) => {
    const newReportList = image.filter((it) => it.name !== targetId);
    setImage(newReportList);
  };

  const _submitBoard = async (e) => {
    if (title === "") {
      return alert("제목을 입력해주세요.");
    } else if (content === "") {
      return alert("내용을 입력해주세요.");
    }

    await axios
      .post("/api/v1/board/white", {
        postId,
        title,
        content,
        image,
      })
      .then((response) => {
        console.log(response);
        if (response != null) {
          navigate(
            "/read",
            {
              state: {
                postId: response.data.postId,
              },
            },
            { replace: false }
          );
        }
      })
      .catch((err) => {
        alert("게시글 수정에 실패하였습니다.");
      });
  };

  useEffect(() => {
    console.log(postId);
    getPost();
  }, []);

  return (
    <div className="Write">
      <div className="image">
        <InputTextComponent
          onCreate={(v) => {
            if (image.length >= 1) {
              alert("이미지는 한장만 가능합니다");
            } else {
              const imageList = { name: v };
              const copyImageList = [...image];
              copyImageList.push(imageList);
              setImage(copyImageList);
            }
          }}
        ></InputTextComponent>
        <ImageLoad data={image} onDelete={onDelete} />
      </div>

      <form id="board_form">
        <input
          type="text"
          autoComplete="off"
          id="title_txt"
          name="title"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <ReactQuill
            value={content}
            onChange={(event) => {
              setContent(event);
            }}
          />
        </div>

        <button type="button" onClick={() => _submitBoard()}>
          {" "}
          포스트 수정{" "}
        </button>
      </form>
    </div>
  );
}

export default Update;
