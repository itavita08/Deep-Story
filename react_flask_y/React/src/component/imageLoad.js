import React from 'react';
import styled from "styled-components";

styled(Test)`
width: "500px",
height: "500px"
`;

function Test(props){
    return <form onSubmit={(event)=>{
      event.preventDefault();
      if(event.target.inputText.value ==="" ){
        alert("다시 입력하세요")
      }
    else{ fetch("/api/v1/add", {
       method: 'POST',
       mode:"cors",
       headers:{
        'content-type':'application/json'
       },
      body: JSON.stringify(event.target.inputText.value)
     })
     .then(response => response.json())
     .then(v => props.onCreate(v))}
    }}>
    <label>
      Input Text:
      <input type="text" name="inputText" id="inputText" />
      <input type="submit" value="버튼" />
    </label>
  </form>
}

export default Test;