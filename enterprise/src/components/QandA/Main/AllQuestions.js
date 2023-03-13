import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@mui/material'
import "./css/AllQuestions.css"

function AllQuestions() {
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>0</p>
              <span>votes</span>
            </div>
            <div className="all-option">
              <p>0</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>0 views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to ='/question'>This is question title</Link>

          <div
            style={{
              maxWidth: "90%",
            }}
          >
            <div>This is answer aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <span className='question-tags'>react</span>
            <span className='question-tags'>antd</span>
            <span className='question-tags'>frontend</span>
          </div>
          <div className="author">
            <small>Timestamp</small>
            <div className="auth-details">
              <Avatar />
              <p>
                User name
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllQuestions