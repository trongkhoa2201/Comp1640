import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
import { getError } from '../../getError';

export default function EditDepartment() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: departmentId } = params;
    const [name, setName] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/departments/${departmentId}`);
                setName(data.name);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchData();
    }, [departmentId]);

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/departments/${departmentId}`, { _id: departmentId, name });
            toast.success('Department updated successfully');
            navigate('/manageDepartment');
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Update Department</h1>
                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Department Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Update Department</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
