import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import InputTextComponent from './InputTextComponent';
import ImageLoad from './ImageloadComponent';
import ReactQuill, {Quill} from 'react-quill';

function Update(){
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState([]);
    const [postId, setPostId] = useState(location.state.postId);
    const [blogContent, setBlogContent] = useState({
        title: '',
        contents: ''
        })

    const navigate = useNavigate();

    const getValue = e => {
    const name = e.currentTarget.name;
    const data = e.currentTarget.value;
    setBlogContent({
        ...blogContent,
        [name] : data
    })
    };

    const getPost = async() => {
        await axios.post("http://localhost:8080/postDetail", {
          postId:postId
          })
          .then(
            data => {
              console.log(data.data); 
              setTitle(data.data.title)
              setContent(data.data.content)
              const imageList = {name:data.data.image}
              const copyImageList = [...image]
              copyImageList.push(imageList);
              setImage(copyImageList);
            }
          )
        //   let quill = new Quill('#editor-container', {
        //     modules: {
        //       toolbar: [
        //         [{ header: [1, 2, false] }],
        //         ['bold', 'italic', 'underline'],
        //         [{ 'list' : 'ordered' }, { 'list' : 'bullet' }],
        //         ['image', 'code-block']
        //       ]
        //     },
        //     theme: 'snow' // or ‘bubble’
        //   });
        //   quill.clipboard.dangerouslyPasteHTML(0, contents);
      
        }; 


    const onDelete = (targetId) => {
        const newReportList = image.filter((it) => it.name !== targetId);	
        setImage(newReportList);
        };

    const _submitBoard = async(e) => {
        // const title = blogContent.title;
        // const content = blogContent.content;
        if(title === "") {
            return alert('제목을 입력해주세요.');
        } else if(content === "") {
            return alert('내용을 입력해주세요.');
        }  
        await axios.post('http://localhost:8080/postUpdate', {
            postId,
            title,
            content,
            image
        })
        .then(
            response =>{
            console.log(response);
            if(response != null){
            navigate("/Detail",{
            state: {
                postId : response.data.postId
            }
            },{ replace: false})}
            }
        )
        .catch(err => {
        console.log('Oh noooo!!');
        console.log(err);
        })
    };
    
    

    useEffect(() => {
    console.log(postId);
    getPost(); 
    },[] );

    
    return(
        <div className='Write'>
        <div className='image'>
          <InputTextComponent onCreate={(v)=>{
            if(image.length >= 1){
                alert("이미지는 한장만 가능합니다");
              }else {
              const imageList = {name:v}
                const copyImageList = [...image]
                copyImageList.push(imageList);
                setImage(copyImageList);
              }
            }}></InputTextComponent>
            <ImageLoad data={image} onDelete={onDelete}/>
        </div>      
    <form id='board_form'>
    <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' value={title} onChange={e =>
    setTitle(e.target.value)
        
         }/>
        <div>
        < ReactQuill value={content}
            onChange={(event) => {
            //   setBlogContent({
            //     ...blogContent,
            //     content: event
            //   });
              setContent(event) 
            }}
        />
        </div>
        {/* <div id='editor-container'>
      <ReactQuill/>
      </div> */}
    <button type='button' onClick={() => _submitBoard()}> 포스트 수정 </button>
    </form>
    </div>
    );
    
}

export default Update;