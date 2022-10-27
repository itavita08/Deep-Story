/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState} from 'react';
import Test from './imageLoad';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import ImageList from './printImage'


function write() {
  const [blogContent, setBlogContent] = useState({
    title: '',
    content: ''
  })
  const [value, setValue] = useState([]);
  const [content1, setContent1] = useState(false);

  const getValue = e => {
    const name = e.currentTarget.name;
    const data = e.currentTarget.value;
    setBlogContent({
      ...blogContent,
      [name] : data
    })
  };

  const onDelete = (targetId) => {
    const newReportList = value.filter((it) => it.name !== targetId);	//filter 메소드 사용!!
    setValue(newReportList);
  };

  const _submitBoard = async () => {
    const title = blogContent.title;
    const content = blogContent.content;
    if(title === "") {
      return alert('제목을 입력해주세요.');
    } else if(content === "") {
      return alert('내용을 입력해주세요.');
    }
    await axios.post('/api/v2/test/test1', {
        title:title,
        content:content,
        value:JSON.stringify(value)
    })
}

     return (
      <div className='Write'>
        <div className='image'>
        <Test onCreate={(v)=>{
            if(value.length >= 1){
              alert("이미지는 한장만 가능합니다");
            }else {
            const testList = {name:v}
              const testList2 = [...value]
              testList2.push(testList);
              setValue(testList2);
              setContent1(true);}
          }}></Test>
          <ImageList data={value} onDelete={onDelete}/>
          </div>      
        <form id='board_form'>
        <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' onChange={getValue} />
        <div>
        < ReactQuill 
            onChange={(event) => {
              setBlogContent({
                ...blogContent,
                content: event
              });
            }}
        />
        </div>
        <button onClick={() => _submitBoard()}> 포스트 등록 </button>
        </form>  
      </div>
         );
  
        }
        
export default write;