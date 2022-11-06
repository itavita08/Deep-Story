import axios from 'axios';

import React, { useEffect, useState } from 'react';
// import test from './Test';
import styled from "styled-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./MainPagecss.css";
import { Link } from 'react-router-dom';

function MypageCard() {

    const location = useLocation();
    const [postId, setPostId] = useState();
    const [title, setTitle] = useState(0);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [list, setList] = useState([{
        "title": "",
        "content": "",
        "image": "",
        "postId":""
    },{
        "title": "",
        "content": "",
        "image": "",
        "postId":""
    },{
        "title": "",
        "content": "",
        "image": "",
        "postId":""
    }]);
    // const [postId, setPostId] = useState("");
    const navigate = useNavigate();



    const getbestPost = async () => {
        await axios.get("http://localhost:80/bestPost")
            .then(
                data => {
                    // console.log(data.data); 
                    setList([{...list, "title":data.data.key0.title,
                    "content":data.data.key0.content,
                    "image":data.data.key0.image,
                    "postId":data.data.key0.postId},{...list, "title":data.data.key1.title,
                    "content":data.data.key1.content,
                    "image":data.data.key1.image,
                    "postId":data.data.key1.postId},{...list, "title":data.data.key2.title,
                    "content":data.data.key2.content,
                    "image":data.data.key2.image,
                    "postId":data.data.key2.postId}])
                    


                }
            )
    };

    const detailPage = (p) => {
        navigate("/detail",{
            state: {
              postId : p
            }
          },{
            replace: false})
    }
    

    useEffect(() => {
        // console.log()
        getbestPost();
        // alert(list[0].title) 
        console.log(list);
        console.log(list[0].title);
        
        
    }, [setList]);

    
    return (
        
        <div class="card-group">
        <div>
            <h2>상위 게시물</h2>
            
            <div class="card" style={{float:'left'}} onClick={()=>{
                detailPage(parseInt(list[0].postId))
            }}>
            <img key="1" class="card-img-top" style={{
                height: 200,
                width: 300
            }} src={"/static/image/"+list[0].image+".png"}/>
            <div class="card-body">
            <h5 class="card-title">title:{list[0].title}</h5>
            <p class="card-text">content:{list[0].content}</p>
            </div>
            </div>

            <div class="card" style={{float:'left'}} onClick={()=>{
                detailPage(parseInt(list[1].postId))
            }}>
            <img key="2" class="card-img-top" style={{ 
                height: 200,
                width: 300
            }} src={"/static/image/"+list[1].image+".png"}/>
            <div class="card-body">
            <h5 class="card-title">title:{list[1].title}</h5>
            <p class="card-text">content:{list[1].content}</p>
            </div>
            </div>

            <div class="card" onClick={()=>{
                detailPage(parseInt(list[2].postId))
            }}>
            <img key="3" class="card-img-top" style={{ 
                height: 200,
                width: 300
            }} src={"/static/image/"+list[2].image+".png"}/>
            <div class="card-body">
            <h5 class="card-title">title:{list[2].title}</h5> 
            <p class="card-text">content:{list[2].content}</p>
            </div>
            </div>
            </div>
        {/* {disList} */}
        </div>
        
        
    )
}
export default MypageCard;
