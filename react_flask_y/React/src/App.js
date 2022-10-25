/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState } from 'react';
import Test from './component/imageLoad';
import Carousel from 'react-material-ui-carousel'
import Write from './component/write'
import ImageList from './component/printImage'
import './App.css'

// function ImageList({name,onDelete}){
//   return(
//     <div className='image1'>
//     <img key={name} style={{
//       height: -100,
//       width: 500
//   }}
//   src={"/static/image/"+name+".png"}/>
//   <a className='close' href='/' data={name} onClick={(onDelete,event)=>{
//     event.preventDefault();
//     onDelete(name)
//   }}>x</a>
//   </div>
//   )
// }

function App() {
  const [content1, setContent1] = useState(false);
  const [newList, setNewList] = useState([])


  
  // let content2 = null;
  // let content3 = null;

  // if(content === true){
  //   if(newList.length === 1){
  //     content2 = newList.map(v => <img key={v.name} style={{
  //           height: -100,
  //           width: 500
  //     }}
  //     src={"/static/image/"+v.name+".png"}/>)
  //     content3 = <a className='close' onClick={event=>{
  //       event.preventDefault();
  //       const newDiaryList = newList.filter((data)=>{
  //         return data.name !== {}
  //       })
  //     }}>x</a>
  //   } else if(newList.length >= 2){
  //     content2 = <Carousel>{newList.map( v => <img key={v.name} style={{
  //       height: -100,
  //       width: 500
  //     }} 
  //     src={"/static/image/"+v.name+".png"}/>)}</Carousel>
  //     content3 = <a className='close'>x</a>
  //   }
  // } 
  // if(content === true){
  //   if(newList.length === 1){
  //     content2 = newList.map(v => <ImageList name={v.name} data={newList} onDelete={onDelete}/>)
  //   } else if(newList.length >= 2){
  //     content2 = <Carousel>
  //       {newList.map(v => <ImageList name={v.name} data={newList} onDelete={onDelete}/>)}
  //       </Carousel>
  //   }
  // } 

  const onDelete = (targetId) => {
    const newReportList = newList.filter((it) => it.name !== targetId);	//filter 메소드 사용!!
    setNewList(newReportList);
  };


  // if(content === true){
  //   if(newList.length === 1){
  //     content2 = <ImageList data={newList} onDelete={onDelete}/>
  //   } else if(newList.length >= 2){
  //     content2 = <ImageList data={newList} onDelete={onDelete}/>
  //   }
  // } 


  return (
    <div className='App'>
      <div className='image'>
          <Test onCreate={(v)=>{
            const testList = {name:v}
              const testList2 = [...newList]
              testList2.push(testList);
              setNewList(testList2);
              setContent1(true);
          }}></Test>
          {/* {content2} */}
          <ImageList data={newList} onDelete={onDelete}/>
      </div>
          <Write onAccess={(title, contents)=>{
            return {'title':title, 'contents':contents, 'image':newList}
          }}></Write>
    </div >
  )
};

export default React.memo(App);
