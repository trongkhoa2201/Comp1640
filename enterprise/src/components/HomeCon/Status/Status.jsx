import React, { useState } from 'react';
import Ava from '../../../img/Ava.jpg';
import '../Status/Status.css';
import { Button, Card, Col, Form, FormLabel } from 'react-bootstrap';
import Switch from '@mui/material/Switch';

export const Status = () => {

  // Like
   const [count, setCount] = useState(0);
   function handleLike() {
       setCount(count + 1);
  }

  // ẩn danh
   
  const [isAnonymous, setIsAnonymous] = useState(false);

  function toggleAnonymousMode() {
    setIsAnonymous(!isAnonymous);
  }

  // phân trang 



    return (
        <div className="status shadow-lg p-3 bg-body mb-4">
            <div className=" d-flex align-items-center justify-content-between ">
                {/* ================= avatar ================= */}
                <div className="ava">
                    <img src={Ava} alt="Ava" style={{ height: 60, width: 60, borderRadius: '50%' }} />
                </div>
                {/* ================= input post ================= */}
                <div
                    style={{
                        width: '80%',
                    }}
                >
                    <Card style={{ border: 'none' }}>
                        <Card.Body>
                            <Card.Title>Special title treatment</Card.Title>
                            <Card.Text
                                style={{
                                    overflow: 'hidden',
                                    height: '50px',
                                    wordWrap: 'break-word',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, distinctio minus
                                suscipit culpa maiores voluptas repudiandae eos perspiciatis aut doloremque dolorem fuga
                                voluptatibus
                            </Card.Text>
                            <Button style={{ background: 'black' }} variant="primary">
                                Go to post
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="p-3">
                    <button style={{ border: 'none', background: 'black' }} onClick={handleLike}>
                        Like
                    </button>
                    <h5 className="like-button mt-2">{count}</h5>
                </div>
            </div>

            {/* ====================== Comment show ====================== */}
            <h5 style={{ borderTop: '2px solid #ccc', paddingTop: '10px' }}>Comment</h5>
            <div className="mt-3">
                <div className="mt-3 m-3 p-3 gap-4 " style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Ava} alt="Ava" style={{ height: 60, width: 60, borderRadius: '50%' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        <h5>Tên chó</h5>
                        <p>lorem ipsum dolor sit amet, consectetur your comment</p>
                    </div>
                </div>
            </div>

            {/* ====================== Comment input ====================== */}
            <div className="mt-3">
                <div className="mt-3 m-3 p-3 gap-4 " style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Ava} alt="Ava" style={{ height: 60, width: 60, borderRadius: '50%' }} />
                    <Form.Control as="textarea" rows="auto" placeholder="Enter your comment" />
                    {/* <button style={{ marginLeft: '10px' }} onClick={toggleAnonymousMode}>
                        Ẩn danh
                    </button> */}
                    <div >
                        <h6>Anonymous</h6>
                        <Switch onChange={toggleAnonymousMode} checked={isAnonymous} />
                    </div>
                </div>
            </div>
        </div>
    );
};
