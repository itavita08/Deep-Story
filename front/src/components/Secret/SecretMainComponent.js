import React, { useEffect, useState} from "react";
import axios from 'axios';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';
import { useNavigate } from 'react-router-dom';

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


  const getFriendProfil = async(id, email) => {
    await axios.post('http://localhost:8080/getSecretProfil', {
      secretFriendId:id,
      friendEmail: email
    })
    .then(
      response => {
        navigate("/secretlist", {
         state:{
            myAccount:response.data[0].myAccount,
            friendAccount: response.data[0].friendAccount,
            postList:response.data[1]
         }
        })
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
            {friendsList.map(a => <li onClick={(e) => {getFriendProfil(a.secretFriendId, a.friendEmail);}} key={a.friendId}> 친구 이름 : {a.friendName} 다이어리 이름 : {a.boardName}</li>)} 
            </ul>
          </div>
        )}
    </div>
  )

}
export default SecretMain;