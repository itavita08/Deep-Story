import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

function ReadImage(props) {
  
    // message 초기값 설정 (""로 설정)
   const [imgurl, setImgurl] = useState('')

    useEffect(() => {
        axios.get('/add')
        .then(response => setImgurl(response.data))
        .catch(error => console.log(error))
    }, []);

    // 화면단
    return (
        <div>
          <div>
              백엔드에서 가져온  데이터 : {imgurl}
          </div>

          {/* <div id = "image1">
            <img className="phoneImage" alt="iPhone_01" src= {imgurl} />              
          </div>           */}
        </div>  
    );
}

export default ReadImage;