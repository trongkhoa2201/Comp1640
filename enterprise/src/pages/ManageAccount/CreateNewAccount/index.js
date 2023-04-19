import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './CreateNewAccount.css';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

export default function CreateNewAccount() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/manageAccount';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [avatar, setAvatar] = useState();

    const roles = [
        { display: '-----Select a role------' },
        { display: 'User', value: 'user' },
        { display: 'QA Manager', value: 'qam' },
        { display: 'QA Coordinator', value: 'qac' },
    ];
    const [departs, setDeparts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/departments')
            .then((response) => {
                setDeparts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const { data } = await Axios.post('/api/users/createAccount', {
                name,
                email,
                password,
                role,
                department,
                avatar,
            });
            console.log(data);
            navigate(redirect || '/manageAccount');
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
            setAvatar(data.secure_url);
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="accountContainer">
            <Container className="small-container">
                <Row className="accountContainer">
                    <Col className="col-8">
                        <h1 className="text-center">Create New Account</h1>
                        <Form onSubmit={submitHandler}>
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
                            <Form.Group className="mb-3" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="role">
                                <Form.Label>Role</Form.Label>
                                <Form.Select value={role} required onChange={(e) => setRole(e.target.value)}>
                                    {roles.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>
                                                {option.display}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="department">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                    value={department}
                                    required
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                <option value=''>-----Select a department------</option>
                                    {departs.map((departs, index) => {
                                        return (
                                            <option key={index} value={departs._id}>
                                                {departs.name}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="imageFile">
                                <Form.Label>Upload new Avatar</Form.Label>
                                <Form.Control type="file" onChange={uploadFileHandler} />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit">Create new account</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col className="col-4">
                        <ListGroup.Item>
                            <Row className="avatar-display">
                                <Col
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        justifyContent: 'center',
                                        marginTop: '50%',
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
