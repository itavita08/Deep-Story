import React, { useState } from "react";
import axios from "axios";

function InputFriendRequest({ data }) {
  const [userEmail, setUserEmail] = useState(data);

  const sendFriendRequest = (event) => {
    axios
      .post("/api/v1/secret/request", {
        secretBoard: event.target.inputText.value,
        guestEmail: userEmail,
      })
      .then((response) => {
        response.data === true
          ? alert("친구 신청 완료")
          : alert("다시 시도해 주세요");
      });
  };

  return (
    <div>
      만들고 싶은 공유 다이어리의 이름을 정해보세요.
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (event.target.inputText.value === "") {
            alert("다시 입력하세요");
          } else {
            sendFriendRequest(event);
          }
        }}
      >
        <input
          type="text"
          name="inputText"
          id="inputText"
          placeholder="공유 다이어리의 이름을 입력하세요."
        />{" "}
        <br />
        <button type="submit" value="버튼">
          친구 신청{" "}
        </button>
      </form>
    </div>
  );
}

export default InputFriendRequest;
