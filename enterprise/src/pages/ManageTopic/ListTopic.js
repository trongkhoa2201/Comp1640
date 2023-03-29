import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { toast } from 'react-toastify';
import { getError } from '../../getError';

export default function ListTopic() {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createTopic');
    };
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/topics');
            setTopics(result.data);
        };
        fetchData();
    }, []);
    const deleteHandler = async (topic) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/topics/${topic._id}`);
                toast.success('Topic deleted successfully');
                window.location.reload(true);
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    return (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 ">
                        <h2>
                            <b>Topic Details</b>
                        </h2>
                    </div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 ">
                        <Button variant="primary" onClick={navigateToCreate}>
                            Create new Topic
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>First Closure</th>
                                    <th>Final Closure</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics.map((topic) => (
                                    <tr key={topic._id}>
                                        <td>{topic.title}</td>
                                        <td>{topic.description}</td>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{topic.firstClosure}</Moment>
                                        </td>
                                        <td>
                                            <Badge bg="danger">
                                                <Moment format="YYYY/MM/DD">{topic.finalClosure}</Moment>
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button variant="success" onClick={() => navigate(`/topics/${topic._id}`)}>
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => deleteHandler(topic)}>
                                                {' '}
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
