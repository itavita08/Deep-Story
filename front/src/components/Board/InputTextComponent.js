import React from 'react';
// import { Form } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'bootstrap-4-react';
import { Badge } from 'bootstrap-4-react';
import './InputTextComponent.css';

function InputTextComponent(props){
    return <form onSubmit={(event)=>{
      event.preventDefault();
      if(event.target.inputText.value ==="" ){
        alert("다시 입력하세요")
      }
    else{ fetch("http://localhost:5000/add", {
       method: 'POST',
       mode:"cors",
       headers:{
        'Content-Type':'application/json'
       },
      body: JSON.stringify(event.target.inputText.value)
     })
     .then(response => response.json())
     .then(v => props.onCreate(v))}
    }}>
      
      <div className='form-group mt-3'>
       
      <input type="text" name="inputText" id="inputText"class="btn btn-outline-success" size={30} />
      
      <input type="submit" value="이미지 불러오기" className="btn btn-success"/>
      </div>
      <div className='badges'>
        <Badge primary>여행</Badge>
        <Badge secondary>일상</Badge>
        <Badge success>좋아요</Badge>
        <Badge danger>반려동물</Badge>
        <Badge warning>건강</Badge>
        <Badge info>육아</Badge>
        <Badge light>패션</Badge>
        <Badge dark>뷰티</Badge>
      </div>
    
  </form>
}

export default InputTextComponent;