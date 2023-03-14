import React from 'react';
import './css/index.css';
import Main from './Main';
import SideBar from '../'

function index() {
  return (
    <div className=''>
       <div className="stack-index">
      <div className="stack-index-content">
        <SideBar />
        <Main />
      </div>
    </div>
    </div>
  )
}

export default index;