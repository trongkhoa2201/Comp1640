import React, { useState } from 'react';
import './CreateCategory.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../../../getError';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateCategory() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/manageCategory';
    // const [first_closure, setFirstClosure] = useState(new Date());
    // const [final_closure, setFinalClosure] = useState(new Date());
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/categories/createCategory', {
                name,
                description,
            });
            console.log(data);
            navigate(redirect || '/manageCategory');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Create New Category</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Category Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    {/* <Form.Group className="mb-3" controlId="first_closure">
                        <Form.Label>First Closure</Form.Label>
                        <DatePicker
                            selected={first_closure}
                            value={first_closure}
                            onChange={(date) => setFirstClosure(date)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="final_closure">
                        <Form.Label>Final Closure</Form.Label>
                        <DatePicker
                            selected={final_closure}
                            value={final_closure}
                            onChange={(date) => setFinalClosure(date)}
                            required
                        />
                    </Form.Group> */}
                    <div className="text-center">
                        <Button type="submit">Create new Category</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
