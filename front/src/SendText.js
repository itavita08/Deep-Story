import axios from 'axios';
import React from 'react';
import {useEffect, useState} from 'react';
import { getCookie } from './storage/Cookie';



//컨트롤러 -> 리엑트로 데이터 뷰
function SendText(props) {

    const token = getCookie('AccessToken');
  
    // message 초기값 설정 (""로 설정)

   const [imgurl, setImgurl] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/account/add')
        .then(response => setImgurl(response.data))
        .catch(error => console.log(error))
    }, []);

   if (token){

    // 화면단
    return (
        <div>
          <div>
              백엔드에서 가져온  데이터 : {imgurl}
          </div>
       
        </div>  
    );    
   }


}



// function SendText(props) {
//   // state
//   const [data, setData] = useState([{}])
//   const [value, setValue] = useState("");
//   const [value1, setValue1] = useState("");
//   const [playerName, setPlayerName] = useState('');
//   const [imgurl, setImgurl] = useState('')


//   const handleChange = (event) => {
//     this.setState({ value: event.target.value });
//   }

//   // const handleSubmit =  (event) => {
    
//   //   let text = document.getElementById('input_text').value;

//   //   let url = "127.0.0.1:5000/add";



//   // }

//   const handleSubmit = (event) => {

//     return fetch( '/', {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }, 
//       method: 'POST',
//       body: {
//         'user1':'1234'
//       }
//     });

//   }



// // .then(json => {

// // this.setState({playerName: json[0]})
// // })


//   //   event.preventDefault();

//   //   let text = document.getElementById('input_text').value;

//   //   alert(text)

//   //   axios.put('http://127.0.0.1:5000/add', {
//   //     textData : text
//   // })
//   // .then(function (response) {
//   //      // response  
//   // }).catch(function (error) {
//   //     // 오류발생시 실행
//   // }).then(function() {
//   //     // 항상 실행
//   // });

//   // try {
//   //   const data = await axios.put("url", { username: "", password: ""});
//   // } catch {
//   //   // 오류 발생시 실행
//   // }

    

//     // this.setValue1("1")
      

//       // if(text){
//       //   alert(text)
//       //   console.log(text)
//       // };
      

      
  

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/send").then(
//       response => response.json()
//     ).then(
//       data => {
//         // 받아온 데이터를 data 변수에 update
//         setData(data);
//       }).then(
      
//     ).catch(
//       (err) => console.log(err)
//     )

//   }, [])

//   return (
//     <div className='App'>
//       <h3>test 하는 중...</h3>
//       <div>
//         {/* 삼항연산자 */}
//         {(typeof data.users === 'undefined') ? (
//           // fetch가 완료되지 않았을 경우에 대한 처리
//           <p>loding...</p>
//         ) : (
//           data.users.map((u) => <p>{u.name}</p>)
//         )}
//       </div>
//       <form onSubmit={handleSubmit} method="POST">
//           <label>
//             Input Text:
//             <input type="text" name="input_text" id="input_text" />
//             <input type="submit" onChange={handleChange} value={value} />
//           </label>
//       </form>

//       {/* <div id = "image">
//         <img src={data} alt="logo" />
//       </div> */}
      
//     </div >
//   )
// }

export default SendText;