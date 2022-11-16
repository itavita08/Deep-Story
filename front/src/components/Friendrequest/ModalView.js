import React from "react";
import "./Modalbasic.css";
import InputFriendRequest from "./InputFriendRequest";

const ModalView = (props) => {
  const { open, close, header, data } = props;
  const userEmail = data;

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
            <InputFriendRequest data={userEmail}></InputFriendRequest>
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
export default ModalView;
