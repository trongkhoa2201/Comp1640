import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../../getError';

export default function CreateDepartment() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/manageDepartment';
    const [name, setName] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/departments/createDepartment', {
                name,
            });
            console.log(data);
            navigate(redirect || '/manageDepartment');
        } catch (err) {
            toast.error(getError(err));
        }
    };
    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Create New Department</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Department Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Create new Department</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
