import React, { useState, handleSubmit } from 'react';
import LoadingSpinner from "../Components/Loader";

function input() {
  const [value, setValue] = useState(null);
  const [content, setContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit =(event) => {
    event.preventDefault();
    setIsLoading(true);
     fetch("/api/add", {
       method: 'POST',
       mode:"cors",
       headers:{
        'content-type':'application/json'
       },
      body: JSON.stringify(event.target.inputText.value)
     })
     .then(response => response.json())
       .then(value => {
         setValue(value)
         setContent(true) 
         setIsLoading(false)
       })
     .catch(e => alert(1+ ' ' + e))
    };
    
    let content2 = null;
    if(content === true){
      content2 = <img src={"/static/image/"+value+".png"}/>
    }
  
  return (
    <div>
      <form id='input_form' onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        <label>
              Text to machine:
              <input type="text" name="inputText" id="inputText" />
              <button type="submit" value="버튼" disabled={isLoading} >보내기</button>
        </label>
        </form>
        <div id='output' name='output' style={{'width':'50%', 'height':'520px'}}>{isLoading ? <LoadingSpinner /> : content2 }</div>
    </div>

  );

}

export default input;