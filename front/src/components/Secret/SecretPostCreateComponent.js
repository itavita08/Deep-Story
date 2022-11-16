import React, { useState } from "react";
import InputTextComponent from "../Board/InputTextComponent";
import SidebarAll from "../Sidebar/SidebarAllComponent";
import LoginHeader from "../Header/LoginHeader";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import ImageLoad from "../Board/ImageloadComponent";
import { useLocation, useNavigate } from "react-router-dom";
import "../../main.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SecretPostCreateComponent = () => {
  const location = useLocation();
  const [blogContent, setBlogContent] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const [secretImage, setImage] = useState([]);
  const [friendAccount, setFriendAccount] = useState(location.state.friend);

  const getValue = (e) => {
    const name = e.currentTarget.name;
    const data = e.currentTarget.value;
    setBlogContent({
      ...blogContent,
      [name]: data,
    });
  };

  const onDelete = (targetId) => {
    const newReportList = secretImage.filter((it) => it.name !== targetId);
    setImage(newReportList);
  };

  const _submitBoard = async (e) => {
    const secretTitle = blogContent.title;
    const secretContents = blogContent.content;
    if (secretTitle === "") {
      return alert("제목을 입력해주세요.");
    } else if (secretContents === "") {
      return alert("내용을 입력해주세요.");
    }
    await axios
      .post("/api/v1/secret/save", {
        secretTitle,
        secretContents,
        secretImage,
        secretFriendId: friendAccount.friendId,
      })
      .then((response) => {
        if (response != null) {
          navigate(
            "/secret/read",
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
        alert("해당 서비스를 이용할 수 없습니다.");
      });
  };

  return (
    <div className="Mains">
      <LoginHeader></LoginHeader>
      <SidebarAll />

      <div className="Write">
        <div className="image">
          <InputTextComponent
            onCreate={(v) => {
              if (secretImage.length >= 1) {
                alert("이미지는 한장만 가능합니다");
              } else {
                const imageList = { name: v };
                const copyImageList = [...secretImage];
                copyImageList.push(imageList);
                setImage(copyImageList);
              }
            }}
          ></InputTextComponent>
          <ImageLoad data={secretImage} onDelete={onDelete} />
        </div>
        <form id="board_form" style={{ float: "left" }}>
          <input
            type="text"
            autoComplete="off"
            id="title_txt"
            name="title"
            placeholder="제목"
            onChange={getValue}
            className="form-control mt-1"
            size={100}
          />

          <label> </label>
          <label> </label>

          <div>
            <ReactQuill
              onChange={(event) => {
                setBlogContent({
                  ...blogContent,
                  content: event,
                });
              }}
            />
          </div>
          <label> </label>
          <label> </label>
          <div>
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => _submitBoard()}
            >
              {" "}
              포스트 등록{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(SecretPostCreateComponent);
