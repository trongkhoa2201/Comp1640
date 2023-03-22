import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../getError';

function ManageAccount() {
    // const [{ loading, error, users, loadingDelete, successDelete }, dispatch] = useReducer(reducer, {
    //     loading: true,
    //     error: '',
    // });
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createAccount');
    };

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/users');
            setUsers(result.data);
        };
        fetchData();
    }, []);

    const deleteHandler = async (user) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                await axios.delete(`/api/users/${user._id}`);
                toast.success('user deleted successfully');
            } catch (error) {
                toast.error(getError(error));
            }
        }
    };

    return (
        <div class="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div class="row ">
                    <div class="col-sm-3 mt-5 mb-4 ">
                        <div className="search_student">
                            <form class="form-inline">
                                <input
                                    class="form-control mr-sm-2"
                                    type="search"
                                    placeholder="Search Student"
                                    aria-label="Search"
                                />
                            </form>
                        </div>
                    </div>
                    <div class="col-sm-3 offset-sm-2 mt-5 mb-4 ">
                        <h2>
                            <b>Account Details</b>
                        </h2>
                    </div>
                    <div class="col-sm-3 offset-sm-1  mt-5 mb-4 ">
                        <Button variant="primary" onClick={navigateToCreate}>
                            Create Account
                        </Button>
                    </div>
                </div>
                <div class="row">
                    <div class="table-responsive ">
                        <table class="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Image</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.avt}</td>
                                        <td>{user.role}</td>
                                        <td>{user.department}</td>
                                        <td>
                                            <Button variant="success" onClick={() => navigate(`/user/${user._id}`)}>
                                                Edit
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => deleteHandler(user)}>
                                                {/* <Button variant="danger" onClick={console.log(user)}> */}
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

export default ManageAccount;
