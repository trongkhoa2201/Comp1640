import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../getError';

export default function ManageCategory() {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createCategory');
    };
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/categories');
            setCategories(result.data);
            // console.log("cate",result.data);
        };
        fetchData();
    }, []);
    const deleteHandler = async (category) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/categories/${category._id}`);
                toast.success('Category deleted successfully');
                window.location.reload(true);
                console.log('cate', category._id);
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
                            <b>Category Details</b>
                        </h2>
                    </div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 ">
                        <Button variant="primary" onClick={navigateToCreate}>
                            Create new Category
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => navigate(`/categories/${category._id}`)}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => deleteHandler(category)}>
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
