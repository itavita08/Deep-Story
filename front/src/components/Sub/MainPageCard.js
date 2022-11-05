import axios from 'axios';

import React, { useEffect, useState} from 'react';

import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

import { Link } from 'react-router-dom';

function MypageCard() {

    const location = useLocation();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [postId, setPostId] = useState("");
    const navigate = useNavigate();

    const getbestPost = async() => {
        await axios.get("http://localhost:8080/bestPost")
        .then(
            data => {
                console.log(data.data);
                setImage(data.data.key1.image)
                setTitle(data.data.key1.title)
                setContent(data.data.key1.content)
            }
        )
    };

    useEffect(() => {
        console.log()
        getbestPost();
    },[] );
    return (
        <div>
            <h2>상위3개 test용</h2>
            <h3>postId:{postId}</h3>
            <h3>image:{image}</h3>
            <h3>title:{title}</h3>
            <h3>content:{content}</h3>
            

        </div>
    
        )
}
export default MypageCard;