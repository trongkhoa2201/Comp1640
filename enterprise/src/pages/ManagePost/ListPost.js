import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../getError';
import { Store } from '../../Store';
import Moment from 'react-moment';

export default function ManagePost() {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createPost');
    };
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/posts');
            setPosts(result.data);
        };
        fetchData();
    }, []);
    const deleteHandler = async (post) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/posts/${post._id}`);
                toast.success('Post deleted successfully');
                window.location.reload(true);
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };
    const deleteAll = async () => {
        if (window.confirm('Are you sure to delete all Post?')) {
            try {
                await axios.delete(`/api/posts`);
                toast.success('Post deleted successfully');
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
                            <b>Posts Details</b>
                        </h2>
                    </div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 ">
                        <Button variant="primary" onClick={navigateToCreate}>
                            Create new post
                        </Button>
                    </div>
                    <div className="col-sm-3 mt-5 mb-4 ">
                        <Button variant="danger" onClick={deleteAll}>
                            Delete All Post
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Category</th>
                                    <th>Topic</th>
                                    <th>isAnonymous</th>
                                    <th>Create At</th>
                                    <th>Views</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post._id}>
                                        <td>{post.title}</td>
                                        <td>{post.postBy}</td>
                                        <td>{post.category.name}</td>
                                        <td>{post.topic.title}</td>
                                        <td>{post.isAnonymous ? 'Yes' : 'No'}</td>
                                        <td>
                                            <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
                                        </td>
                                        <td>{post.views}</td>
                                        {userInfo.role === 'user' ? (
                                            <td>
                                                <Button
                                                    variant="success"
                                                    onClick={() => navigate(`/posts/${post._id}`)}
                                                >
                                                    View
                                                </Button>{' '}
                                            </td>
                                        ) : (
                                            <td>
                                                <Button
                                                    variant="success"
                                                    onClick={() => navigate(`/posts/${post._id}`)}
                                                >
                                                    View
                                                </Button>

                                                <Button variant="danger" onClick={() => deleteHandler(post)}>
                                                    {' '}
                                                    Delete
                                                </Button>
                                            </td>
                                        )}
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
