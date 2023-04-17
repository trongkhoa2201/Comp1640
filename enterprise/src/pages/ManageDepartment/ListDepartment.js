import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../getError';

export default function ListDepartment() {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createDepartment');
    };
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/departments');
            setDepartments(result.data);
        };
        fetchData();
    }, []);
    const deleteHandler = async (department) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/departments/${department._id}`);
                toast.success('department deleted successfully');
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
                            <b>Department Details</b>
                        </h2>
                    </div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 ">
                        <Button variant="primary" onClick={navigateToCreate}>
                            Create new department
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive ">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((department) => (
                                    <tr key={department._id}>
                                        <td>{department.name}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                onClick={() => navigate(`/departments/${department._id}`)}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => deleteHandler(department)}>
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
