import React from 'react';

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
    <label>
      Input Text:
      <input type="text" name="inputText" id="inputText" />
      <input type="submit" value="버튼" />
    </label>
  </form>
}

export default InputTextComponent;