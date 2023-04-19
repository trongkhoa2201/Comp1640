import React, { useContext, useReducer, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { getError } from '../getError';
import { Store } from '../Store';
import '../Styles/profile.css'

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
    const [role, setRole] = useState(userInfo.role);
    const [department, setDepartment] = useState(userInfo.department);
    const [avatar, setAvatar] = useState(userInfo.avatar);

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                '/api/users/profile',
                { name, email, role, avatar },
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
                    <Col className="col-6">
                        <h1 className="text-center">My Profile</h1>
                        <Form onSubmit={updateHandler}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control value={role} onChange={(e) => setRole(e.target.value)} disabled />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="department">
                                <Form.Label>Departments</Form.Label>
                                <Form.Control value={department} onChange={(e) => setDepartment(e.target.value)} disabled />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col className="col-6">
                        <ListGroup.Item>
                            <Row className="avatar-display">
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <div className="avatar-thumbnails">
                                        <img
                                            src={avatar}
                                            alt={avatar}
                                        ></img>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
