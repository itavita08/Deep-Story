/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState } from 'react';
import Test from './component/imageLoad';
import Carousel from 'react-material-ui-carousel'


function App() {
  const [content, setContent] = useState(false);
  const [newList, setNewList] = useState([])

  
  let content2 = null;

  if(content === true){
    if(newList.length <= 1){
      content2 = newList.map(v => <img key={v.name} src={"/static/image/"+v.name+".png"}/>)
    } else{
      content2 = <Carousel>{newList.map( v => <img key={v.name} src={"/static/image/"+v.name+".png"}/>)}</Carousel>
    }
  } 
  
  return (
    <div className='App'>
          <Test onCreate={(v)=>{
            const testList = {name:v}
              const testList2 = [...newList]
              testList2.push(testList);
              setNewList(testList2);
              setContent(true);
          }}></Test>
          {content2}
    </div >
  )
};

export default React.memo(App);