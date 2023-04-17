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
    const [isAnonymous, setIsAnonymous] = useState('');
    // const [isAnonymous, setIsAnonymous] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDisLikes] = useState(0);
    const [clicked, setClicked] = useState(false);
    const [onclicked, setOnClicked] = useState(false);
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
                { content, commentBy, isAnonymous },
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

    const handleDislike = () => {
        if (!onclicked) {
            setDisLikes(dislikes + 1);
            setOnClicked(true);
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
                            <img src={userInfo.avatar} alt="" style={{ height: 70, width: 70, borderRadius: '50%' }} />
                        )}
                        <div>
                            <h4>{post.postBy}</h4>
                            <p>
                                <i className="ri-price-tag-3-line"> {post.category} </i>
                                <i className="ri-price-tag-3-line"> {post.topic} </i>
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
                                onClick={handleDislike}
                            >
                                {onclicked ? (
                                    <i className="ri-thumb-down-fill fs-3"></i>
                                ) : (
                                    <i className="ri-thumb-down-line fs-3"></i>
                                )}
                            </Button>
                            <h5 style={{ paddingTop: '15px' }}>{dislikes} Dislikes</h5>
                        </div>
                    </div>
                </section>
                {/* ==================== Comment-Show ==================== */}
                <section>
                    <h5 style={{marginLeft: 10}}
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
                                                style={{ height: 30, width: 30, borderRadius: '50%', marginRight: '5px' }}
                                            />
                                        ) : (
                                            <img
                                                src={Ava}
                                                alt="fileUpload"
                                                style={{ height: 30, width: 30, borderRadius: '50%', marginRight: '5px' }}
                                            />
                                        )}
                                        {comment.isAnonymous ? (
                                            <strong>Unknow People</strong>
                                        ) : (
                                            <strong>{comment.commentBy}</strong>
                                        )}
                                    </div>
                                    <p>{comment.content}</p>
                                    <p>{comment.createdAt.substring(0, 10)}</p>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </div>
                </section>
                {/* ==================== Comment-Input ==================== */}
                {userInfo ? (
                    <form onSubmit={submitHandler}>
                        <div className="mt-3" style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                            <div>
                                <Form.Check
                                    className="mb-3"
                                    type="checkbox"
                                    id="isAnonymous"
                                    label="isAnonymous"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'row' }}>
                            <img
                                src={userInfo.avatar}
                                alt="fileUpload"
                                style={{ height: 50, width: 50, borderRadius: '100%', marginRight: '10px' }}
                            />
                            <Form.Control
                                as="textarea"
                                rows={1}
                                placeholder="Enter your comment"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ height: 50, width: 650, marginRight: '10px' }}
                            />
                            <Button
                                type="submit"
                                style={{ marginLeft: '10px', marginTop: '10px', background: 'btn-btn-primary' }}
                                disabled={loadingCreateComment}
                            >
                                Summit
                            </Button>
                            {loadingCreateComment && <LoadingBox></LoadingBox>}
                            </div>                           
                            
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
