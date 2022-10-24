import React from 'react';

function Test(props){
    return <form onSubmit={(event)=>{
      event.preventDefault();
     fetch("http://127.0.0.1:5000/add", {
       method: 'POST',
       mode:"cors",
       headers:{
        'content-type':'application/json'
       },
      body: JSON.stringify(event.target.inputText.value)
     })
     .then(response => response.json())
     .then(v => props.onCreate(v))
    }}>
    <label>
      Input Text:
      <input type="text" name="inputText" id="inputText" />
      <input type="submit" value="버튼" />
    </label>
  </form>
}

  export default Test;