import { useLocation } from 'react-router-dom';

import SidebarAll from '../Sidebar/SidebarAllComponent';
import LoginHeader from '../Header/LoginHeader';

export default function UpdateProfilComponent() {
  const location = useLocation();

  const accountEmail = location.state.Email;
  const accountName = location.state.Name;
  const accountGender = location.state.Gender;
  const accountDate = location.state.Birth;
  
  return (


    <div>

    <LoginHeader></LoginHeader>
    <SidebarAll/>

      <p>Email : {accountEmail}</p>
      <p>Name : {accountName}</p>
      <p>Gender : {accountGender}</p>
      <p>Birth : {accountDate}</p>
    </div>
  );
}
