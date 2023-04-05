<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import { getError } from '../getError';
=======
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

import "../styles/profile.css"
import Ava from "../img/Ava.jpg";
>>>>>>> e888bcd30f75b73bdfd5d10c83557a594b4ffa1b

export default function Profile() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: userId } = params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [avatar, setAvatar] = useState();

    const roles = [
        { display: '-----Select a role------' },
        { display: 'Staff', value: 'staff' },
        { display: 'QA Manager', value: 'qam' },
        { display: 'QA Coordinator', value: 'qac' },
    ];
    const departments = [
        { display: 'Select a dapartment' },
        { display: 'Finance', value: 'Finance' },
        { display: 'Marketing', value: 'Marketing' },
        { display: 'Human Resource', value: 'Human Resource' },
        { display: 'Information Technology', value: 'Information Technology' },
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/users/${userId}`);
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
                setDepartment(data.department);
                setAvatar(data.avatar);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchData();
    }, [userId]);

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(setAvatar);
            // console.log(avatar);
            await axios.put(`/api/users/profile`, { name, email, password, avatar });
            toast.success('User updated successfully');
            navigate('/manageAccount');
        } catch (error) {
            toast.error(getError(error));
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
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={email} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Control value={role} onChange={(e) => setRole(e.target.value)} disable />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Department</Form.Label>
                                <Form.Control value={department} onChange={(e) => setDepartment(e.target.value)} disable />
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
