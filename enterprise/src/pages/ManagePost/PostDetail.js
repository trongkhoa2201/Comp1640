import { Switch } from '@mui/material';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import './PostDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../getError';
import Ava from '../../img/Ava.jpg';

const reducer = (state, action) => {
    switch (action.type) {
        case 'REFRESH_POST':
            return { ...state, post: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreateReview: true };
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreateReview: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreateReview: false };
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, post: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const StatusDetails = () => {
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDisLikes] = useState(0);
    const [clicked, setClicked] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    const { id: postId } = params;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, post, loadingCreateReview }, dispatch] = useReducer(reducer, {
        post: [],
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/posts/${postId}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                console.log(userInfo);
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [postId]);

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
    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <Container>
            <div className="detailStatus">
                {/* ==================== fileUpload & date ==================== */}
                <section className="avaInfo gap-3 ">
                    <div className="d-flex gap-3">
                        {post.fileUpload === null ? (
                            <img src={Ava} alt="" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        ) : (
                            <img src={post.fileUpload} alt="" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        )}

                        <div>
                            <h4>{post.postBy}</h4>
                            <p>
                                <i class="ri-price-tag-3-line"> {post.category} </i>
                                <i class="ri-price-tag-3-line"> {post.topic} </i>
                            </p>
                        </div>
                    </div>
                    {/* ==================== Date update ==================== */}
                    <div>
                        <p>Date :</p>
                        <p>{post.createdAt.substring(0, 10)}</p>
                    </div>
                </section>
                {/* ==================== Title ==================== */}
                <section className="mt-3">
                    <h5 className="title">{post.title}</h5>
                </section>
                {/* ==================== Content ==================== */}
                <section className="mt-3">
                    <p>{post.content}</p>
                </section>
                {/* ==================== Img (if any) ==================== */}
                <section>
                    <div onClick={openModal}>
                        {post.fileUpload === null ? (
                            <img
                                src="https://mdbootstrap.com/img/new/slides/041.webp"
                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }}
                                alt=""
                            ></img>
                        ) : (
                            <img
                                src={post.fileUpload}
                                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }}
                                alt=""
                            ></img>
                        )}
                    </div>

                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Body>
                            <img src={post.fileUpload} style={{ width: '100%', height: 'auto' }} alt=""></img>
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
                                    <i class="ri-thumb-up-fill fs-3"></i>
                                ) : (
                                    <i class="ri-thumb-up-line fs-3"></i>
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
                                    <i class="ri-thumb-up-fill fs-3"></i>
                                ) : (
                                    <i class="ri-thumb-up-line fs-3"></i>
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
                        <img
                            src={post.fileUpload}
                            alt="fileUpload"
                            style={{ height: 60, width: 60, borderRadius: '50%' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                            <h5>Tên chó</h5>
                            <p>lorem ipsum dolor sit amet, consectetur your comment</p>
                        </div>
                    </div>
                </section>
                {/* ==================== Comment-Input ==================== */}
                <section>
                    <div className="mt-3  gap-3 " style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={userInfo.avatar}
                            alt="fileUpload"
                            style={{ height: 60, width: 60, borderRadius: '50%' }}
                        />
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
