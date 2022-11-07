/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import InputTextComponent from '../Board/InputTextComponent';
import ImageLoad from '../Board/ImageloadComponent';
import ReactQuill from 'react-quill';

function SecretPostUpdate(){
    const location = useLocation();
    const [secretTitle, setTitle] = useState("");
    const [secretContent, setContent] = useState("");
    const [secretImage, setImage] = useState([]);
    const [secretPostId, setPostId] = useState(location.state.secretPostId);
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
        await axios.post("http://localhost:8080/secretPostDetail", {
          secretPostId:secretPostId
          })
          .then(
            data => {
              console.log(data.data); 
              setTitle(data.data.title)
              setContent(data.data.content)
              const imageList = {name:data.data.image}
              const copyImageList = [...secretImage]
              copyImageList.push(imageList);
              setImage(copyImageList);
            }
          )   
        }; 


    const onDelete = (targetId) => {
        const newReportList = secretImage.filter((it) => it.name !== targetId);	
        setImage(newReportList);
        };

    const _submitBoard = async(e) => {
        if(secretTitle === "") {
            return alert('제목을 입력해주세요.');
        } else if(secretContent === "") {
            return alert('내용을 입력해주세요.');
        }  
        await axios.post('http://localhost:8080/secretPostUpdate', {
            secretPostId,
            secretTitle,
            secretContent,
            secretImage
        })
        .then(
            response =>{
            console.log(response);
            if(response != null){
            navigate("/secretDetail",{
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
    console.log(secretPostId);
    getPost(); 
    },[] );

    
    return(
        <div className='Write'>
        <div className='image'>
          <InputTextComponent onCreate={(v)=>{
            if(secretImage.length >= 1){
                alert("이미지는 한장만 가능합니다");
              }else {
              const imageList = {name:v}
                const copyImageList = [...secretImage]
                copyImageList.push(imageList);
                setImage(copyImageList);
              }
            }}></InputTextComponent>
            <ImageLoad data={secretImage} onDelete={onDelete}/>
        </div>      
    <form id='board_form'>
    <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목' value={secretTitle} onChange={e =>
    setTitle(e.target.value)
        
         }/>
        <div>
        < ReactQuill value={secretContent}
            onChange={(event) => {
              setContent(event) 
            }}
        />
        </div>
    <button type='button' onClick={() => _submitBoard()}> 포스트 수정 </button>
    </form>
    </div>
    );
    
}

export default SecretPostUpdate;