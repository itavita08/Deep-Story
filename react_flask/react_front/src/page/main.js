import React, { Component } from 'react';
import './main.css';

import { Link, Route, Routes} from 'react-router-dom';
import { Home, Write, Detail } from './index.js';

function main () {
  


    return (
      <div className='Mains'>
        <div id='Mains-left'>
          <h3> Left Side </h3>
        </div>

        <div>
          <Routes>
            <Route path='/' exact element={<Home/>} />
            <Route path='/write' exact element={<Write/>} />
            <Route path='/detail' exact element={<Detail/>} />
          </Routes>
          <nav>
            <Link to="/">Home </Link> |{" "}
            <Link to="/write">글쓰기</Link>
          </nav>
        </div>

      </div>

    );
}


export default main;
