import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { getError } from '../../../getError';
import { Store } from '../../../Store';

export default function CreateNewPost() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/myPost';

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postBy, setPostBy] = useState('');
    const [isAnonymous, setIsAnonymous] = useState('');
    const [topic, setTopic] = useState('');
    const [category, setCategory] = useState('');
    const [fileUpload, setFileUpload] = useState();
    const [show, setShow] = useState(false);

    const [cate, setCate] = useState([]);
    const [topics, setTopics] = useState([]);

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    useEffect(() => {
        axios
            .get('/api/topics')
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('/api/categories')
            .then((response) => {
                setCate(response.data);
                setPostBy(userInfo.name);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post(
                '/api/posts/createPost',
                {
                    title,
                    content,
                    postBy,
                    topic,
                    category,
                    isAnonymous,
                    fileUpload,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                },
            );
            navigate(redirect || '/myPost');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            const { data } = await Axios.post('/api/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Image uploaded successfully');
            setFileUpload(data.secure_url);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="accountContainer">
            <Container className="small-container">
                <Row className="accountContainer">
                    <Col className="col-8">
                        <h1 className="text-center">Create New Post</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                id="isAnonymous"
                                label="isAnonymous"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                            />
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>Content</Form.Label>
                                <Form.Control value={content} onChange={(e) => setContent(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="topic">
                                <Form.Label>Topic</Form.Label>
                                <Form.Select value={topic} required onChange={(e) => setTopic(e.target.value)}>
                                    <option value="">-----Select a topic------</option>
                                    {topics.map((topic, index) => {
                                        return (
                                            <option key={index} value={topic._id}>
                                                {topic.title}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={category} required onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">-----Select a category------</option>
                                    {cate.map((cate, index) => {
                                        return (
                                            <option key={index} value={cate._id}>
                                                {cate.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imageFile">
                                <Form.Label>Image upload</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler} />
                            </Form.Group>
                            <Form.Check
                                className="mb-3"
                                type="checkbox"
                                id="term"
                                label="Accept Term and Condition"
                                checked={show}
                                onChange={(e) => setShow(e.target.checked)}
                            />
                            {show && (
                                <div className="text-center">
                                    <Button type="submit">Create new Post</Button>
                                </div>
                            )}
                        </Form>
                    </Col>
                    <Col>
                        <ListGroup.Item>
                            <Row className="avatar-display">
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <div></div>
                                    <img
                                        src={fileUpload}
                                        alt={fileUpload}
                                        className="img-fluid rounded mx-auto d-block img-thumbnails"
                                    ></img>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
