/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState} from "react";
import axios from 'axios';


function AccountPostAll(){
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [image, setImage] = useState("");

  const getPost = async() => {
    // e.preventDefault();
    await axios.post("http://localhost:8080/accountPostAll", {
      })
      .then(
        data => {
          console.log(data.data); 
          setTitle(data.data.title)
          setContents(data.data.content)
          setImage(data.data.image)

        }
      )  
    }; 

  useEffect(() => {
    getPost(); 
  },[] );

  return (
    <div>
      {title}
  
      <img key={image} style={{
                height: -100,
                width: 500
            }} src={"/static/image/"+image+".png"}/>
    </div>
  )

}

export default AccountPostAll;