import axios from "axios";
import React from "react";
import "./Modalbasic.css";

const SecretFriendModal = (props) => {
  const { open, close, header, data } = props;
  const secretFriendList = data;

  const sendAccept = (e, email) => {
    e.preventDefault();
    axios
      .post("/api/v1/secret/accept", {
        answer: "yes",
        friendEmail: email,
      })
      .then((response) => {
        response.data === true
          ? alert("친구 수락 완료")
          : alert("다시 시도해 주세요");
      });
  };

  const sendDecline = (e, email) => {
    e.preventDefault();
    axios
      .post("/api/v1/secret/accept", {
        answer: "no",
        friendEmail: email,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div>
              {secretFriendList.map((a) => (
                <div>
                  보내는 사람 : {a.friendName} - {a.friendEmail}
                  <button
                    onClick={(e) => {
                      sendAccept(e, a.friendEmail);
                    }}
                  >
                    수락
                  </button>{" "}
                  <button
                    onClick={(e) => {
                      sendDecline(e, a.friendEmail);
                    }}
                  >
                    거절
                  </button>
                </div>
              ))}
            </div>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default SecretFriendModal;
