import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AccountPostAll() {
  const navigate = useNavigate();
  const getPost = async() => {
    await axios.get("http://localhost:80/postAll")
      .then(
         response => {
          console.log(response.data);
          if(response != null){
            navigate("/postallviewLogin",{
            state: {
              data : response.data
            }
          },{ replace: false})}
        }
      )
      .catch(err => {
        console.log('Error!!');
        console.log(err);
      })
  };
  
  
  useEffect(() => {
  getPost();  
  }, [])


}

export default React.memo(AccountPostAll);