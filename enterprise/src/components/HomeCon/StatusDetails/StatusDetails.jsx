import { Switch } from '@mui/material';
import React, { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import Ava from '../../../img/Ava.jpg';
import '../StatusDetails/StatusDetails.css';

const StatusDetails = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDisLikes] = useState(0);
    const [clicked, setClicked] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };
    const handleDisLike = () => {
        if (!clicked) {
            setLikes(likes + 1);
            setClicked(true);
        }
    };

    const handleLike = () => {
        if (!clicked) {
            setDisLikes(dislikes + 1);
            setClicked(true);
        }
    };

    function toggleAnonymousMode() {
        setIsAnonymous(!isAnonymous);
    }
    return (
        <Container>
            <div className="detailStatus">
                {/* ==================== Ava & date ==================== */}
                <section className="avaInfo gap-3 ">
                    <div className="d-flex gap-3">
                        <img src={Ava} alt="Ava" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        <div>
                            <h4>Chó Shiba</h4>
                            <p>
                                <i className="ri-price-tag-3-line"> Xương </i>
                                <i className="ri-price-tag-3-line"> Ngầu </i>
                            </p>
                        </div>
                    </div>
                    {/* ==================== Date update ==================== */}
                    <div>
                        <p>Date :</p>
                        <p className="">27/10/2001</p>
                    </div>
                </section>
                {/* ==================== Title ==================== */}
                <section className="mt-3">
                    <h5 className="title">Title: Department</h5>
                </section>
                {/* ==================== Content ==================== */}
                <section className="mt-3">
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ea, quod eum soluta explicabo
                        corporis laboriosam saepe atque aliquam odit quidem unde molestias velit reprehenderit incidunt
                        facere ipsam repellendus? Nisi.laboriosam saepe atque aliquam odit quidem unde molestias velit
                        reprehenderit incidunt facere ipsam repellendus? Nisi.
                    </p>
                </section>
                {/* ==================== Img (if any) ==================== */}
                <section>
                    <div onClick={openModal}>
                        <img
                            src={Ava}
                            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }}
                            alt=""
                        ></img>
                    </div>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Body>
                            <img src={Ava} style={{ width: '100%', height: 'auto' }} alt=""></img>
                        </Modal.Body>
                    </Modal>
                </section>
                {/* ==================== Like Icon ==================== */}
                <section>
                    <p style={{ borderTop: '3px solid #ccc', marginTop: '20px' }}></p>
                    <div className=" d-flex justify-content-between">
                        <div className="d-flex">
                            <Button
                                variant="outline-danger"
                                style={{ border: 'none', marginRight: '10px' }}
                                onClick={handleLike}
                            >
                                {clicked ? (
                                    <i className="ri-thumb-up-fill fs-3"></i>
                                ) : (
                                    <i className="ri-thumb-up-line fs-3"></i>
                                )}
                            </Button>
                            <h5 style={{ paddingTop: '15px' }}>{likes} Likes</h5>
                        </div>
                        <div className="d-flex">
                            <Button
                                variant="outline-danger"
                                style={{ border: 'none', marginRight: '10px' }}
                                onClick={handleDisLike}
                            >
                                {clicked ? (
                                    <i className="ri-thumb-up-fill fs-3"></i>
                                ) : (
                                    <i className="ri-thumb-up-line fs-3"></i>
                                )}
                            </Button>
                            <h5 style={{ paddingTop: '15px' }}>{dislikes} Likes</h5>
                        </div>
                    </div>
                </section>
                {/* ==================== Comment-Show ==================== */}
                <section>
                    <h5 style={{ borderTop: '3px solid #ccc', paddingTop: '10px', marginTop: '20px' }}>Comment</h5>
                    <div className="mt-3 gap-3 " style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Ava} alt="Ava" style={{ height: 60, width: 60, borderRadius: '50%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <h5>Tên chó</h5>
                            <p>lorem ipsum dolor sit amet, consectetur your comment</p>
                        </div>
                    </div>
                </section>
                {/* ==================== Comment-Input ==================== */}
                <section>
                    <div className="mt-3  gap-3 " style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Ava} alt="Ava" style={{ height: 60, width: 60, borderRadius: '50%' }} />
                        <Form.Control as="textarea" rows={1} placeholder="Enter your comment" />
                        <Button style={{ marginLeft: '10px', background: 'black' }}>Summit</Button>
                        <div>
                            <h6>Anonymous</h6>
                            <Switch onChange={toggleAnonymousMode} checked={isAnonymous} />
                        </div>
                    </div>
                </section>
            </div>
        </Container>
    );
};

export default StatusDetails;
