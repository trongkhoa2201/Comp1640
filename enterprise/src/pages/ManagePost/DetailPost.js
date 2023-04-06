import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';
import { Store } from '../../Store';
import { toast } from 'react-toastify';
import { getError } from '../../getError';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

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

function DetailPost() {
    let commentsRef = useRef();
    const [content, setContent] = useState('');
    const [commentBy, setCommentBy] = useState('');
    const [isAnonymous, setIsAnonymous] = useState('');
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

    const [views, setView] = useState('');
    const viewHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/posts/${post._id}/view`, { views });
        } catch (error) {
            toast.error(getError(error));
        }
    };
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
            const { data } = await axios.post(`/api/posts/${post._id}/comments`, { content, commentBy, isAnonymous });

            dispatch({
                type: 'CREATE_SUCCESS',
            });
            toast.success('Comment submitted successfully');
            post.comment.unshift(data.comment);
            post.views = data.views + 1;
            dispatch({ type: 'REFRESH_PRODUCT', payload: post });
            window.scrollTo({
                behavior: 'smooth',
                top: commentsRef.current.offsetTop,
            });
        } catch (error) {
            toast.error(getError(error));
            dispatch({ type: 'CREATE_FAIL' });
        }
    };

    return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
        <div>
            <Row>
                <Col md={6}>
                    {post.fileUpload === null ? (
                        <img
                            className="img-large"
                            src="https://mdbootstrap.com/img/new/slides/041.webp"
                            alt={post.title}
                            width="540"
                            height="720"
                        ></img>
                    ) : (
                        <img
                            className="img-large"
                            src={post.fileUpload}
                            alt={post.title}
                            width="540"
                            height="720"
                        ></img>
                    )}
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{post.title}</h1>
                        </ListGroup.Item>

                        <ListGroup.Item>Author : {post.postBy}</ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description: </strong>
                            {post.content}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Category: </strong>
                            {post.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Topic: </strong>
                            {post.topic}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Create At:
                            <Moment format="YYYY/MM/DD">{post.createAt}</Moment>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-flex gap-20 justify-content-between">
                                <div className="d-flex gap-2 align-items-center">
                                    <i className="fa fa-heart"></i>
                                    <p className="mt-2">{post.views}</p>
                                    <Button>Like</Button>
                                </div>
                                <div className="d-flex gap-2 align-items-center">
                                    <i className="fa fa-heart-broken"></i>
                                    <p className="mt-2">{post.views}</p>
                                    <Button onClick={viewHandler}>View</Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row>
                <div className="my-3">
                    <h2 ref={commentsRef}>Comment</h2>
                    <ListGroup>
                        {post.comments.map((comment) => (
                            <ListGroup.Item key={comment._id}>
                            {
                                comment.isAnonymous ? (<strong>Unknow People</strong> ) :(<strong>{comment.commentBy}</strong>)
                            }
                                <p>{comment.createdAt.substring(0, 10)}</p>
                                <p>{comment.content}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="my-3">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <h2>Write a comment</h2>
                                <Form.Group className="mb-3" controlId="isAnonymous">
                                    <Form.Label>Do you want to make this comment anonymous?</Form.Label>
                                    <Form.Check
                                        className="mb-3"
                                        type="checkbox"
                                        id="isAnonymous"
                                        label="isAnonymous"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                    />
                                </Form.Group>
                                <FloatingLabel controlId="floatingTextarea"  className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                    {/* <Form.Control
                                        as="textarea"
                                        placeholder="Author"
                                        value={commentBy}
                                        onChange={(e) => setCommentBy(e.target.value)}
                                        disabled
                                    /> */}
                                </FloatingLabel>

                                <div className="mb-3">
                                    <Button disabled={loadingCreateReview} type="submit">
                                        Submit
                                    </Button>
                                    {loadingCreateReview}
                                </div>
                            </form>
                        ) : (
                            <div>Please Login to write comment</div>
                        )}
                    </div>
                </div>
            </Row>
        </div>
    );
}
export default DetailPost;
