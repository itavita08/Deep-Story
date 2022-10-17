import React from 'react';
import { useState, useEffect } from 'react';
import LoadingSpinner from "./Components/Loader"
 

function App() {
  // state
  const [data, setData] = useState([{}])
  const [value, setValue] = useState(null);
  const [content, setContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

 const handleSubmit = (event) => {
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
  }

  useEffect(() => {
    fetch("/api/users").then(
      response => response.json()
    ).then(
      data => {
        setData(data);
      }
    ).catch(
      (err) => console.log(err)
    )
  }, []);

  let content2 = null;

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
              <input type="submit" value="버튼" disabled={isLoading}/>
            </label>
          </form>

          <h1>{value}</h1>
          
          {isLoading ? <LoadingSpinner /> : content2 }
      
           
    </div >
  )
};

export default App;