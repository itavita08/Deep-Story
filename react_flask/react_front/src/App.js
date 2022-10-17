import React from 'react';
import { useState, useEffect } from 'react';
 

function App() {
  // state
  const [data, setData] = useState([{}])
  
  useEffect(() => {
    // url fetch문제
    fetch("/api/users").then(
      response => response.json()
    ).then(
      data => {
        // 받아온 데이터를 data 변수에 update
        setData(data);
      }
    ).catch(
      (err) => console.log(err)
    )
    
  }, [])

  return (
    <div className='App'>
      <h1>test 하는 중...</h1>
      <div>
        {/* 삼항연산자 */}
        {(typeof data.users === 'undefined') ? (
          // fetch가 완료되지 않았을 경우에 대한 처리
          <p>loding...</p>
        ) : (
          data.users.map((u) => <p>{u.name}</p>)
          
        )}
      </div>
      <br></br>
      <form action='/api/users' method="POST" target='picture'>
        <label>
          Input Text:
          <input type="text" name="input_text" id="input_text"/>
          <input type="submit" value="submit" /> 
        </label>
      </form>
      <br></br>
      <div>
        제목
        <input type='text' />
      </div>

      <div>
        내용
        <textarea></textarea>
      </div>
      <br></br>
      {/* 이미지가 로딩될 iframe, 있어야 페이지 이동 안됨, name == form.target */}
      <iframe name='picture' style={{height:"530px", width:"530px"}}> </iframe>

    </div >
  )
}

export default App;