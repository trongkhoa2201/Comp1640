import React from 'react';
import "../Main/css/index.css";
import MainQuestion from './MainQuestion';

function index() {
  return (
    <div className=''>
       <div className="stack-index">
      <div className="stack-index-content">
        <MainQuestion />
      </div>
    </div>
    <Card />
    </div>
  )
}

export default index;