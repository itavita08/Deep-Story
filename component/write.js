import React, { useState, handleSubmit } from 'react';
import { Input } from './index.js';
import axios from 'axios';


function write() {
  const [value, setValue] = useState(null);
 
  const _submitBoard = async () => {
    const title = document.getElementsByName('title')[0].value.trim();
    const contents = document.getElementsByName('contents')[0].value.trim();

    if(title === "") {
      return alert('제목을 입력해주세요.');

    } else if(contents === "") {
      return alert('내용을 입력해주세요.');
    }

    const data = { title : title, contents : contents, image : value};
    const res = await axios.post('/api/test', data, {  
      headers: {
        'content-type': 'multipart/form-data'
      }, 
    })
  }
    
    return (
      <div className='Write'>   
        <div>
          <Input onSave = {(data) => setValue(data)}/>
        </div>    
        <form id='board_form'>
        <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목'/>
        <textarea id='content_txt' name='contents' placeholder='내용을 입력하세요.'></textarea>
        <button onClick={() => _submitBoard()}> 포스트 등록 </button>
        </form>  
      </div>
    );
  
}

export default write;

