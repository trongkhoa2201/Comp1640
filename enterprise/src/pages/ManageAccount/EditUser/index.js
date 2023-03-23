import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './EditUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import axios from 'axios';

export default function EditAccount() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: userId } = params;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [avt, setAvt] = useState();

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
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchData();
    }, [userId]);

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/users/${userId}`, { _id: userId, name, email, role, department });
            toast.success('User updated successfully');
            navigate('/manageAccount');
        } catch (error) {
            toast.error(getError(error));
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
                                    {departments.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>
                                                {option.display}
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
