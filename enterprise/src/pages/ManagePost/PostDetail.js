import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Button, Container, Form, ListGroup, Modal } from 'react-bootstrap';
import './PostDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Store } from '../../Store';
import axios from 'axios';
import { getError } from '../../getError';
import Ava from '../../img/Ava.jpg';
import annonymous from '../../img/annonymous.jpg';
import logger from 'use-reducer-logger';
import { toast } from 'react-toastify';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
        case 'REFRESH_POST':
            return { ...state, post: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreateComment: true };
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreateComment: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreateComment: false };
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

function StatusDetails() {
    let commentsRef = useRef();
    const [content, setContent] = useState('');
    const [commentBy, setCommentBy] = useState('');
    const [avtCmt, setAvtCmt] = useState('');
    const [isAnonymous, setIsAnonymous] = useState('');
    // const [isAnonymous, setIsAnonymous] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDisLikes] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [onclicked, setOnClicked] = useState(false);
    const [check, setCheck] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const { id: postId } = params;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [{ loading, error, post, loadingCreateComment }, dispatch] = useReducer(logger(reducer), {
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
                setCommentBy(userInfo.name);
                setAvtCmt(userInfo.avatar);
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
        };
        fetchData();
    }, [postId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!content) {
            toast.error('Please enter comment');
            return;
        }
        try {
            const { data } = await axios.post(
                `/api/posts/${postId}/comments`,
                { content, commentBy, avtCmt, isAnonymous },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                },
            );
            dispatch({
                type: 'CREATE_SUCCESS',
            });
            toast.success('Comment submitted successfully');
            post.comments.unshift(data.comment);
            post.views = data.views + 1;
            dispatch({ type: 'REFRESH_POST', payload: post });
            window.scrollTo({
                behavior: 'smooth',
                top: commentsRef.current.offsetTop,
            });
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'CREATE_FAIL' });
        }
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const likeHandler = async (e) => {
        e.preventDefault();
        if (!clicked) {
            setLikes(post.likes + 1);
            setClicked(true);
            try {
                const { data } = await axios.put(`/api/posts/${postId}/like`, { likes });
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };
    const dislikeHandler = async (e) => {
        e.preventDefault();
        if (!onclicked) {
            setDisLikes(post.dislikes + 1);
            setOnClicked(true);
            try {
                const { data2 } = await axios.put(`/api/posts/${postId}/dislike`, { dislikes });
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    return loading ? (
        <LoadingBox />
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <Container>
            <div className="detailStatus">
                {/* ==================== fileUpload & date ==================== */}
                <section className="avaInfo gap-3 ">
                    <div className="d-flex gap-3">
                        {post.isAnonymous ? (
                            <img src={annonymous} alt="" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        ) : (
                            <img src={post.user.avatar} alt="" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        )}
                        <div>
                            <h4>{post.postBy}</h4>
                            <p>
                                <i className="ri-price-tag-3-line"> {post.category.name} </i>
                                <i className="ri-price-tag-3-line"> {post.topic.title} </i>
                            </p>
                        </div>
                    </div>
                    {/* ==================== Date update ==================== */}
                    <div>
                        <div className="d-flex gap-2 align-items-center">
                            <i className="fa fa-eye"></i>
                            <p className="mt-2">{post.views}</p>
                        </div>
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
                            {post.fileUpload === null ? (
                                <img
                                    src="https://mdbootstrap.com/img/new/slides/041.webp"
                                    style={{ width: '100%', height: 'auto' }}
                                    alt=""
                                ></img>
                            ) : (
                                <img src={post.fileUpload} style={{ width: '100%', height: 'auto' }} alt=""></img>
                            )}
                        </Modal.Body>
                    </Modal>
                </section>
                {/* ==================== Like Icon ==================== */}
                <section>
                    <div className=" d-flex justify-content-between mt-2">
                        <div className="d-flex">
                            <Button
                                variant="outline-primary"
                                style={{ border: 'none', marginRight: '10px' }}
                                onClick={likeHandler}
                            >
                                {clicked ? (
                                    <i className="ri-thumb-up-fill fs-3"></i>
                                ) : (
                                    <i className="ri-thumb-up-line fs-3"></i>
                                )}
                            </Button>
                            <h5 style={{ paddingTop: '15px' }}>{post.likes} Likes</h5>
                        </div>
                        <div className="d-flex">
                            <Button
                                variant="outline-danger"
                                style={{ border: 'none', marginRight: '10px' }}
                                onClick={dislikeHandler}
                            >
                                {onclicked ? (
                                    <i className="ri-thumb-down-fill fs-3"></i>
                                ) : (
                                    <i className="ri-thumb-down-line fs-3"></i>
                                )}
                            </Button>
                            <h5 style={{ paddingTop: '15px' }}>{post.dislikes} Dislikes</h5>
                        </div>
                    </div>
                </section>
                {/* ==================== Comment-Show ==================== */}
                <section>
                    <h5
                        style={{ borderTop: '3px solid #ccc', paddingTop: '10px', marginTop: '20px' }}
                        ref={commentsRef}
                    >
                        Comment
                    </h5>
                    <div className="mb-3">
                        {post.comments.length === 0 && <MessageBox>There is no comment</MessageBox>}
                    </div>

                    <div className="mt-3 gap-3 " style={{ display: 'flex', flexDirection: 'column' }}>
                        {post.comments.map((comment) => (
                            <ListGroup.Item key={comment._id}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginLeft: '10px',
                                        borderBottom: '1px solid black',
                                    }}
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {comment.isAnonymous ? (
                                            <img
                                                src={annonymous}
                                                alt="fileUpload"
                                                style={{ height: 50, width: 50, borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <img
                                                src={comment.avtCmt}
                                                alt="fileUpload"
                                                style={{ height: 50, width: 50, borderRadius: '50%' }}
                                            />
                                        )}
                                        <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px', marginLeft: '10px'}}>
                                        {comment.isAnonymous ? (
                                            <strong>Unknown People</strong>
                                        ) : (
                                            <strong>{comment.commentBy}</strong>
                                        )}
                                        <div style={{ marginRight: '50px'}}>
                                        <p>{comment.content}</p>
                                        </div>
                                        </div>
                                    </div>
                                    <div style={{ position: 'absolute', top: '0px', right: '0'}}>
                                    <p>{comment.createdAt.substring(0, 10)}</p>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </div>
                </section>
                {/* ==================== Comment-Input ==================== */}
                {userInfo ? (
                    <form onSubmit={submitHandler}>
                            <div>
                                <Form.Check
                                    className="mt-3 ml-2"
                                    type="checkbox"
                                    id="isAnonymous"
                                    label="isAnonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                            </div>
                        <div className="mt-3  gap-3 " style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>   
                            <img
                                src={userInfo.avatar}
                                alt="fileUpload"
                                style={{ height: 50, width: 50, borderRadius: '50%' }}
                            />
                            <Form.Control
                                as="textarea"
                                rows={1}
                                placeholder="Enter your comment"
                                value={content}
                                style={{width:'600px', height:'50px'}}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <Button
                                type="submit"
                                style={{ marginLeft: '10px'}}
                                disabled={loadingCreateComment}
                                className='btn btn-primary'
                            >
                                Submit
                            </Button>
                            {loadingCreateComment && <LoadingBox></LoadingBox>}
                            
                        </div>
                    </form>
                ) : (
                    <MessageBox>Please Login to write comment</MessageBox>
                )}
            </div>
        </Container>
    );
}

export default StatusDetails;
