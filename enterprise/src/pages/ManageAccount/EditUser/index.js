import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import './EditUser.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export default function EditAccount() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: userId } = params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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
            await axios.put(`/api/users/${userId}`, { _id: userId, name, email, role, department, avatar });
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
// cmt
