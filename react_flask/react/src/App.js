import React from 'react';
import { useState, useEffect } from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      playerName: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log("making request")
    fetch('/')
      .then(response => {
        return response.json()
      })
      .then(json => {
      this.setState({playerName: json[0]})
      })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} action="http://127.0.0.1:5000/add" method="POST">
          <label>
            Input Text:
            <input type="text" name="input_text" id="input_text" />
            <input type="submit" onChange={this.handleChange} value={this.state.value} />
          </label>
        </form>
      </div>
    );
  }
}

// function App2() {
//   // state
//   const [data, setData] = useState([{}])

//   useEffect(() => {
//     fetch("/api/users").then(
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
//     </div >
//   )
// }

export default App;