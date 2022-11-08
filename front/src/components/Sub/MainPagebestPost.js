import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./MainPagecss.css";
import purify from "dompurify";

function MypageCard() {

    const location = useLocation();
    const [title, setTitle] = useState(0);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [list, setList] = useState([{
        "title": "",
        "content": "",
        "image": ""
    },{
        "title": "",
        "content": "",
        "image": ""
    },{
        "title": "",
        "content": "",
        "image": ""
    }]);

    const navigate = useNavigate();

    const getbestPost = async () => {
        await axios.get("http://localhost:8080/bestPost")
            .then(
                data => {
                    // console.log(data.data); 
                    setList([{...list, "title":data.data.key0.title,
                    "content":data.data.key0.content,
                    "image":data.data.key0.image},{...list, "title":data.data.key1.title,
                    "content":data.data.key1.content,
                    "image":data.data.key1.image},{...list, "title":data.data.key2.title,
                    "content":data.data.key2.content,
                    "image":data.data.key2.image}])
                }
            )
    };
    

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
            
            <div class="card" style={{float:'left' , background:'none'}}>
            <img key="1" class="card-img-top" style={{
                height: 200,
                width: 300
            }} src={"/static/image/"+list[0].image+".png"}/>
            <div class="card-body">
            <h4 class="card-title">{list[0].title}</h4>
            <div class='card-text' dangerouslySetInnerHTML={{ __html: purify.sanitize(list[0].content) }} />
            </div>
            </div>

            <div class="card" style={{float:'left', background:'none'}}>
            <img key="2" class="card-img-top" style={{ 
                height: 200,
                width: 300
            }} src={"/static/image/"+list[1].image+".png"}/>
            <div class="card-body">
            <h4 class="card-title">{list[1].title}</h4>
            <div class='card-text' dangerouslySetInnerHTML={{ __html: purify.sanitize(list[1].content) }} />
            </div>
            </div>

            <div class="card" style={{float:'left', background:'none'}}>
            <img key="3" class="card-img-top" style={{ 
                height: 200,
                width: 300
            }} src={"/static/image/"+list[2].image+".png"}/>
            <div class="card-body">
            <h4 class="card-title">{list[2].title}</h4> 
            <div class='card-text' dangerouslySetInnerHTML={{ __html: purify.sanitize(list[2].content) }} />
            </div>
            </div>
            </div>
        {/* {disList} */}
        </div>
        
        
    )
}
export default MypageCard;
