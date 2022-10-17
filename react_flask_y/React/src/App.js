/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState, useEffect } from 'react';
// import { useState } from 'react';




function App() {
  // state
  const [data, setData] = useState([{}])
  const [value, setValue] = useState(null);
  const [content, setContent] = useState(false);

  
  let content2 = null;

 const handleSubmit = (event) => {
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
     .then(value => {
       setValue(value)
        setContent(true) 
     })
   .catch(e => alert(1+ ' ' + e))
  }

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users").then(
      response => response.json()
    ).then(
      data => {
        setData(data);
      }
    ).catch(
      (err) => console.log(err)
    )
  }, []);

  if(content === true){
    content2 = <img src={"/static/image/"+value+".png"}/>
  }
  
  return (
    <div className='App'>
      <h1>test 하는 중...</h1>
      <div>
        {(typeof data.users === 'undefined') ? (
          <p>loding...</p>
        ) : (
          data.users.map((u) => <p>{u.name}</p>)
        )}
      </div >
          <form onSubmit={handleSubmit}>
            <label>
              Input Text:
              <input type="text" name="inputText" id="inputText" />
              <input type="submit" value="버튼" />
            </label>
          </form>
      
          <h1>{value}</h1>
            {content2}  
    </div >
  )
};

export default App;
