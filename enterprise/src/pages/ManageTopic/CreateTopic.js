import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getError } from '../../getError';

export default function CreateTopic() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/manageTopic';
    const [firstClosure, setFirstClosure] = useState(new Date());
    const [finalClosure, setFinalClosure] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await Axios.post('/api/topics/createTopic', {
                title,
                description,
                firstClosure,
                finalClosure,
            });
            console.log(data);
            navigate(redirect || '/manageTopic');
        } catch (err) {
            toast.error(getError(err));
        }
    };

    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Create New Topic</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label> Topic Title</Form.Label>
                        <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label> Description</Form.Label>
                        <Form.Control value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="firstClosure">
                        <Form.Label>First Closure</Form.Label>
                        <DatePicker
                            selected={firstClosure}
                            value={firstClosure}
                            onChange={(date) => setFirstClosure(date)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="finalClosure">
                        <Form.Label>Final Closure</Form.Label>
                        <DatePicker
                            selected={finalClosure}
                            value={finalClosure}
                            onChange={(date) => setFinalClosure(date)}
                            required
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button type="submit">Create new Topic</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
