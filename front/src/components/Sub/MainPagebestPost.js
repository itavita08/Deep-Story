import axios from 'axios';

import React, { useEffect, useState } from 'react';

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Link } from 'react-router-dom';

function MypageCard() {

    const location = useLocation();
    const [title, setTitle] = useState(0);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [list, setList] = useState([{
        "title": "",
        "content": "",
        "image": ""
    }]);
    // const [postId, setPostId] = useState("");
    const navigate = useNavigate();

    // const disList = (list2) => {
    //     return (
    //         <h2>상위3개 test용</h2>,
            
    //         <img key={list2[0].image} style={{
    //             height: -100,
    //             width: 500
    //         }} src={"/static/image/"+list2[0].image+".png"}/>,
    //         <h3>title:{list2[0].title}</h3>,
    //         <h3>content:{list2[0].content}</h3>,
            
    //         <img key={list2[1].image} style={{
    //             height: -100,
    //             width: 500
    //         }} src={"/static/image/"+list2[1].image+".png"}/>,
    //         <h3>title:{list2[1].title}</h3>,
    //         <h3>content:{list2[1].content}</h3>,
            
    //         <img key={list2[2].image} style={{
    //             height: -100,
    //             width: 500
    //         }} src={"/static/image/"+list2[2].image+".png"}/>,
    //         <h3>title:{list2[2].title}</h3>,
    //         <h3>content:{list2[2].content}</h3>
    //     )
    // }

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
                    // setTitle(1)
                    // const list2 = [{...list, "title":data.data.key0.title,
                    // "content":data.data.key0.content,
                    // "image":data.data.key0.image},{...list, "title":data.data.key1.title,
                    // "content":data.data.key1.content,
                    // "image":data.data.key1.image},{...list, "title":data.data.key2.title,
                    // "content":data.data.key2.content,
                    // "image":data.data.key2.image}]
                    // disList(list2)


                }
            )
    };
    // const handleButton = (e) => {
    //     setList([...list, title])
    //     setList([...list, content])
    //     setList([...list, image])
    // }

    useEffect(() => {
        // console.log()
        getbestPost();
        // alert(list[0].title) 
        console.log(list);
        console.log(list[0].title);
        // console.log(list[1].title);
        // console.log(list[2].title);
        
    }, []);

    
    return (
        <div>
            <h2>상위3개 test용</h2>
            <div>
            <img key={list[0].image} style={{
                height: -100,
                width: 500
            }} src={"/static/image/"+list[0].image+".png"}/>
            <h3>title:{list[0].title}</h3>
            <h3>content:{list[0].content}</h3>
            
            <img key={list[1].image} style={{ 
                height: -100,
                width: 500
            }} src={"/static/image/"+list[1].image+".png"}/>
            <h3>title:{list[1].title}</h3>
            <h3>content:{list[1].content}</h3>
            
            <img key={list[2].image} style={{
                height: -100,
                width: 500
            }} src={"/static/image/"+list[2].image+".png"}/>
            <h3>title:{list[2].title}</h3>
            <h3>content:{list[2].content}</h3>
            </div>
        {/* {disList} */}
        </div>
        

    )
}
export default MypageCard;
