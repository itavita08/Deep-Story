
import React from 'react';
import SendText from './SendText';
import LoginComponent from './components/Login/LoginComponent'
import SignComponets from './components/Login/SignComponents';
import LogoutComponent from './components/Login/LogoutComponet';
import WriteBoardComponents from './components/Board/WriteBoardComponents'


import Home from './components/Home';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Link } from 'react-router-dom';

import {useEffect, useState} from 'react';

//import GetImage from './GetImage';


//function sendText(props) {
// function App() {

//   // state
//   const [data, setData] = useState([{}])
//   const [value, setValue] = useState("");
//   const [playerName, setPlayerName] = useState('');

//   const handleChange = (event) => {
//     this.setState({ value: event.target.value });
//   }

//   const handleSubmit = (event) => {
//     console.log("making request")
//     fetch('http://127.0.0.1:5000/add')
//       .then(response => {
//         return response.json()
//       })
//       .then(json => {
//       this.setState({playerName: json[0]})
//       })
//   }

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/users").then(
//       response => response.json()
//     ).then(
//       data => {
//         // 받아온 데이터를 data 변수에 update
//         setData(data);
//       }
//     ).catch(
//       (err) => console.log(err)
//     )

//   }, [])

//   return (
//     <div className='App'>
//       <h1>test 하는 중...</h1>
//       <div>
//         {/* 삼항연산자 */}
//         {(typeof data.users === 'undefined') ? (
//           // fetch가 완료되지 않았을 경우에 대한 처리
//           <p>loding...</p>
//         ) : (
//           data.users.map((u) => <p>{u.name}</p>)
//         )}
//       </div>
//       <form onSubmit={handleSubmit} action="http://127.0.0.1:5000/add" method="POST">
//           <label>
//             Input Text:
//             <input type="text" name="input_text" id="input_text" />
//             <input type="submit" onChange={handleChange} value={value} />
//           </label>
//         </form>
//     </div >
//   )
// }

// class sendText extends React.Component {

//     constructor(props) {
//       super(props);
//       this.state = {
//         value: '',
//         playerName: ''
//       };
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     handleChange(event) {
//       this.setState({ value: event.target.value });
//     }
  
//     handleSubmit(event) {
//       console.log("making request")
//       fetch('/')
//         .then(response => {
//           return response.json()
//         })
//         .then(json => {
//         this.setState({playerName: json[0]})
//         })
//     }
//     render() {
//       return (
//         <div>
//             <div id = "flask">

//                 <form onSubmit={this.handleSubmit} action="http://127.0.0.1:8080/encore/add" method="POST">
//                     <label>
//                     spring Input Text:
//                     <input type="text" name="input_text" id="input_text" />
//                     <input type="submit" onChange={this.handleChange} value={this.state.value} />
//                     </label>
//                 </form>  
//             </div>

//             <div id = "Spring">
//                 <form onSubmit={this.handleSubmit} action="http://127.0.0.1:5000/add" method="POST">
//                     <label>
//                     flask Input Text:
//                     <input type="text" name="input_text" id="input_text" />
//                     <input type="submit" onChange={this.handleChange} value={this.state.value} />
//                     </label>
//                 </form>
//             </div>
//         </div>
//       );
//     }
//   }


// 컨트롤러 -> 리엑트로 데이터 뷰
// function readImage(props) {
  
//     // message 초기값 설정 (""로 설정)
//    const [imgurl, setImgurl] = useState('')

//     useEffect(() => {
//         axios.get('/add')
//         .then(response => setImgurl(response.data))
//         .catch(error => console.log(error))
//     }, []);

//     // 화면단
//     return (
//         <div>
//           <div>
//               백엔드에서 가져온  데이터 : {imgurl}
//           </div>

//           <div id = "image1">
//             <img className="phoneImage" alt="iPhone_01" src= {imgurl} />              
//           </div>          
//         </div>  
//     );
// }

function App(props) {

  const isLoggedIn = props.isLoggedIn;

  if (!isLoggedIn) {
	return (
		<div className='App'>
      
      <h3>----- 메인 페이지 -----</h3>

      <img className="mainImage" src= "static/image/image.png" alt="mainImage01"  />  

      <div>
        <Link to="/">홈</Link>
        <p/>
        <Link to="/login">로그인</Link>
        <p/>
        <Link to="/sign">회원가입</Link>
        <p/>
        <Link to="/write">글 쓰기</Link>
        <p/>
        <Link to="/SendText">테스트</Link>
        <p/>
        <Link to="/LogoutComponent">로그아웃</Link>
      </div>

			{/* <BrowserRouter> */}
				<Routes>
          <Route index element={<Home />} />
          <Route path="/login" exact element={<LoginComponent />} />
          <Route path="/sign" exact element={<SignComponets />} />
          <Route path="/write" exact element={<WriteBoardComponents />} />
          <Route path="/SendText" element={<SendText />} /> 
          <Route path="/LogoutComponent" element={<LogoutComponent />} /> 
				</Routes>
			{/* </BrowserRouter> */}
      
      
		</div>
	);
}
}


export default App;


