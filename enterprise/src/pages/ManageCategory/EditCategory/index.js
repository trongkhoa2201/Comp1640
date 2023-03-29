import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

export default function EditCategory() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: categoryId } = params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/categories/${categoryId}`);
                setName(data.name);
                setDescription(data.description);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchData();
    }, [categoryId]);

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/categories/${categoryId}`, { _id: categoryId, name, description });
            toast.success('Category updated successfully');
            navigate('/manageCategory');
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Update Category</h1>
                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Category Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Update Category</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
