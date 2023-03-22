import { MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap';
import './EditUser.css';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';

export default function EditAccount() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/crud';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [avt, setAvt] = useState();

    const roles = [{ value: 'Staff' }, { value: 'QA Manager' }, { value: 'QA Coordinator' }];
    const departments = [
        { value: 'Finance' },
        { value: 'Marketing' },
        { value: 'Human Resource' },
        { value: 'Information Technology' },
    ];

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
            });
            // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            // localStorage.setItem('userInfo', JSON.stringify(data));
            console.log(data);
            navigate(redirect || '/crud');
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
                                <Form.Label>Password</Form.Label>
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
                                                {option.value}
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
                                    {departments.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>
                                                {option.value}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="pic" className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control type="file" enable />
                            </Form.Group>
                            <div className="text-center">
                                <Button type="submit">Update</Button>
                            </div>
                        </Form>
                    </Col>
                    <Col>
                        <div>Display pic</div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
