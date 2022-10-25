import React, { useState, handleSubmit } from 'react';
// import LoadingSpinner from "../Components/Loader";
// import { Input } from './index.js';
import axios from 'axios';



function Write(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([]);

  const _submitBoard = async ()=> {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = document.getElementsByName('contents')[0].value.trim();

    if(title === "") {
      return alert('제목을 입력해주세요.');

    } else if(contents === "") {
      return alert('내용을 입력해주세요.');
    }

    // const data = { title : title, contents : contents };
    setData(props.onAccess(title,contents))
    const res = await axios('/add/test', {
      method : 'POST',
      data : data,
      headers: new Headers()
    })
  }


  // const handleSubmit =(event) => {
  //   event.preventDefault();
  //    fetch("/api/test", {
  //      method: 'POST',
  //      mode:"cors",
  //      headers:{
  //       'content-type':'multipart/form-data'
  //      },
  //     body: JSON.stringify(event.target.board.value)
  //    })
  //    .then(response => response.json())
  //      .then(value => {
  //        setValue(value)
  //      })
  //    .catch(e => alert(1+ ' ' + e))
  //   };
    
    
    return (
      <div className='Write'>      
        <form name='board' id='board_form' onSubmit={handleSubmit}>
            <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목'/>
            <textarea id='content_txt' name='contents' placeholder='내용을 입력하세요.'></textarea>
            <button onClick={() => _submitBoard()}> 포스트 등록 </button>
        </form>
      </div>
    );
  
}

export default Write;