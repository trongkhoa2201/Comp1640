import React, { useContext, useReducer, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { getError } from '../getError';
import { Store } from '../Store';

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true };
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false };
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

export default function Profile() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(userInfo.avatar);

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                { name, email, password, avatar },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                },
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL',
            });
            toast.error(getError(err));
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        try {
            const { data } = await axios.post('/api/upload', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Image uploaded successfully');
            setAvatar(data.url);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="accountContainer">
            <Container className="small-container">
                <Row className="accountContainer">
                    <Col className="col-8">
                        <h1 className="text-center">Edit account</h1>
                        <Form onSubmit={updateHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    required
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imageFile">
                                <Form.Label>Upload new Avatar</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler} />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit">Update</Button>
                            </div>
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
                                        src={avatar}
                                        alt={avatar}
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
