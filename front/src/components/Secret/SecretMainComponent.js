import React, { useEffect, useState} from "react";
import axios from 'axios';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import SecretList from "./SecretListComponent";

const SecretMain = () => {

  const [friendsList, setFriendsLsit] = useState([]);
  const navigate = useNavigate();

  const getFriendsList = async() => {
    await axios.get('http://localhost:8080/getSecretFriends')
    .then(response => {
      console.log(response.data);
      setFriendsLsit(response.data);
    }
    )
  }

  useEffect(() => {
    getFriendsList()
  }, [])

  return(
    <div>
      <LoginHeader />
      <SidebarAdminLoginComponent />

        {friendsList.length === 0 ? (
          <div>목록이 존재하지 않습니다.</div>
        ): (
          <div>
            <ul>
            {friendsList.map(a => <li style={{width:'200px'}} onClick={() => {navigate('/secretList',{state:{secretFriendId: a.secretFriendId, friendEmail:a.friendEmail}})}} key={a.friendId}><Link to='/secretlist'> 친구 이름 : {a.friendName} 다이어리 이름 : {a.boardName}</Link></li>)} 
            </ul>
          </div>
        )}
        <Routes>
        <Route path="secretlist" element={<SecretList/>}/>
        </Routes>
     

    </div>
  )

}
export default SecretMain;