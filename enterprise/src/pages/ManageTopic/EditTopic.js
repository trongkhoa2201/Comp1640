import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../../getError';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

export default function EditTopic() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: topicId } = params;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [firstClosure, setFirstClosure] = useState(new Date());
    const [finalClosure, setFinalClosure] = useState(new Date());
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/topics/${topicId}`);
                setTitle(data.title);
                setDescription(data.description);
            } catch (err) {
                toast.error(getError(err));
            }
        };
        fetchData();
    }, [topicId]);

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/topics/${topicId}`, { _id: topicId, title, description, firstClosure, finalClosure });
            toast.success('Topic updated successfully');
            navigate('/manageTopic');
        } catch (error) {
            toast.error(getError(error));
        }
    };

    return (
        <div className="categoryContainer">
            <Container className="small-container">
                <h1 className="text-center">Update Topic</h1>
                <Form onSubmit={updateHandler}>
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
                        <Button type="submit">Update Topic</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
