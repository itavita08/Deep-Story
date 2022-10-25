import React from 'react';
import { useState} from 'react';
import Test from './component/imageLoad';
import Write from './component/write'
import ImageList from './component/printImage'
import './App.css'


function App() {
  const [content, setContent] = useState(false);
  const [newList, setNewList] = useState([])
  
  const onDelete = (targetId) => {
  const newReportList = newList.filter((it) => it.name !== targetId);	//filter 메소드 사용!!
  setNewList(newReportList);
  };
  
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
          <ImageList data={newList} onDelete={onDelete}/>
      </div>
          <Write onAccess={(title, contents)=>{
            return {'title':title, 'contents':contents, 'image':newList}
          }}></Write>
    </div >
  )
};

export default React.memo(App);
