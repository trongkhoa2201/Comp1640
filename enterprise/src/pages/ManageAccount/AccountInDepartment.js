import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getError } from '../../getError';
import { Store } from '../../Store';
import logger from 'use-reducer-logger';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'DELETE_REQUEST':
            return { ...state, loadingDelete: true, successDelete: false };
        case 'DELETE_SUCCESS':
            return {
                ...state,
                loadingDelete: false,
                successDelete: true,
            };
        case 'DELETE_FAIL':
            return { ...state, loadingDelete: false };
        case 'DELETE_RESET':
            return { ...state, loadingDelete: false, successDelete: false };
        default:
            return state;
    }
};

function AccountInDepartment() {
    const [{ loading, error, users, loadingDelete, successDelete }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/users/department`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };
        if (successDelete) {
            dispatch({ type: 'DELETE_RESET' });
        } else {
            fetchData();
        }
    }, [userInfo, successDelete]);

    return (
        <div className="container ">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                    <div className="row ">
                        <div className="offset-sm-2 mt-5 mb-4 ">
                            <h2>
                                <b>Account In {userInfo.department} Department</b>
                            </h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="table-responsive ">
                            <table className="table table-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Avatar</th>
                                        <th>Role</th>
                                        <th>Department</th>
                                        <th>Post of User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <img
                                                    src={user.avatar}
                                                    alt={user.avatar}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>
                                            </td>
                                            <td>{user.role}</td>
                                            <td>{user.department.name}</td>
                                            <td>
                                                <Button variant="success" onClick={() => navigate(`/posts/list/${user._id}`)}>
                                                    View
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AccountInDepartment;