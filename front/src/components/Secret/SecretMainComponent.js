import React, { useEffect, useState} from "react";
import axios from 'axios';
import SidebarAdminLoginComponent from '../Sidebar/SidebarAdminLoginComponent';
import LoginHeader from '../Header/LoginHeader';

const SecretMain = () => {

  const [friendsList, setFriendsLsit] = useState([]);

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
            {friendsList.map(a => <li>{a.friendName} {a.boardName}</li>)} 
            </ul>
          </div>
        )}
     

    </div>
  )

}
export default SecretMain;