import React from 'react';
import { useState, useEffect } from 'react';
import { Main } from './page/index.js'


function App() {
  // state
  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/api/v1/users").then(
      response => response.json()
    ).then(
      data => {
        setData(data);
      }
    ).catch(
      (err) => console.log(err)
    )
  }, []);

  
  return (
    <div className='App'>
      <h1 id='h'>test 하는 중...</h1>
      <div>
        {(typeof data.users === 'undefined') ? (
          <p>loding...</p>
        ) : (
          data.users.map((u) => <p id={u}>{u.name}</p>)
        )}
      </div >
          <div>
            <Main />
          </div>
    </div >
  )
};

export default App;