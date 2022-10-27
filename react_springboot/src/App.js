
import {useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Header(props){
  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
        setTitle(event.target.value);
      }}/></p>
      <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type="submit" value="Update"></input></p>
    </form>
  </article>
}
function App() {
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [user, setUser] = useState("");
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...가나다'},
    {id:2, title:'css', body:'css is ...가나다'},
    {id:3, title:'javascript', body:'javascript is ...가나다'}
  ]);

  useEffect(()=> {
    axios.post("/api/users").then((response)=> {
      if(response.data){
        console.log(response.data);
        setUser(response.data);
      } else {
        alert("연결실패");
      }
    });
  },[]);
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
      <li><a href={'/update/'+id} onClick={event=>{
        event.preventDefault();
        setMode('UPDATE');
      }}>Update</a></li>
      <li><input type="button" value="Delete" onClick={()=>{
        const newTopics = []
        for(let i=0; i<topics.length; i++){
          if(topics[i].id !== id){
            newTopics.push(topics[i]);
          }
        }
        setTopics(newTopics);
        setMode('WELCOME');
      }} /></li>
    </>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  } else if(mode === 'UPDATE'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
  const responseHandler = ({data}) => {
    setMessage(data);
    return data;
};
const errorHandler = ({message}) => {
  setMessage(message);
  return message;
};

const onNonCorsHeaderHandler = () => {
  axios.get('http://localhost:8080/not-cors')
      .then(responseHandler)
      .catch(errorHandler);
};

const onCorsHeaderHandler = () => {
  axios.get('http://localhost:8080/cors').then(responseHandler);
};

const onNonProxyHandler = () => {
  axios.get('/not-proxy')
      .then(responseHandler)
      .catch(errorHandler);
};

const onProxyHandler = () => {
  axios.get('/proxy').then(responseHandler);
};

const handleClick = event => {
    
  console.log(event.target);
  console.log('Image clicked');
};
  return (
    
    <div>
      <img src="assets/img/logo.jpg" alt="logo" onClick={handleClick}/>
      <div className='App'>
      <header className='App-header'>
        <h1>{user.id}</h1>
        <h1>{user.username}</h1>
        <h1>{user.password}</h1>
        <h1>{user.email}</h1>
      </header>
      <Header title="react-test" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl}
        <p>
          {message}
        </p>
        <div>
              <button onClick={onNonCorsHeaderHandler}>non cors header</button>
              <button onClick={onCorsHeaderHandler}>cors header</button>
              <button onClick={onNonProxyHandler}>nonProxy</button>
              <button onClick={onProxyHandler}>proxy</button>
        </div>
        
      </ul>
    </div>
    
    </div>



  );
};

export default App;


// non cors header 버튼
// localhost:8080 서버로 직접 요청합니다.
// CORS 정책 위반에 대한 에러 메세지가 출력됩니다.
// axios 모듈의 catch 부분에서 에러 메세지를 화면에 출력합니다.


// cors header 버튼
// localhost:8080 서버로 직접 요청합니다.
// 서버로부터 전달받은 데이터를 정상적으로 화면에 출력합니다.


// nonProxy 버튼
// localhost:3000 리액트 어플리케이션으로 요청합니다.
// /not-proxy 경로에 해당하는 프록시 설정이 존재하지 않습니다.
// localhost:3000 호스트에는 /not-proxy 요청을 받아줄 경로가 없으므로 404 NOT FOUND 에러가 발생합니다.


// proxy 버튼
// localhost:3000 리액트 어플리케이션으로 요청합니다.
// /proxy 경로에 해당하는 프록시 설정이 존재합니다.
// http://localhost:8080 호스트 서버로부터 전달받은 데이터를 정상적으로 화면에 출력합니다.
