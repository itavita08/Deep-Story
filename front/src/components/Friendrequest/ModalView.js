import React from "react";
import './Modalbasic.css';
import InputFriendRequest from "./InputFriendRequest";


const ModalView = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data } = props;
  const userEmail = data;
  
  return (
      // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
    {open ? (
      <section>
        <header>
          {header}
          <button className="close" onClick={close}>
            &times;
          </button>
        </header>
        {/* <main>{props.children}</main> */}
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
}
export default ModalView;