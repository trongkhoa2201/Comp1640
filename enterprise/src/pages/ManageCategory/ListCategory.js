import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';
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
            return { ...state, categories: action.payload, loading: false };
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

export default function ManageCategory() {
    const navigate = useNavigate();
    const navigateToCreate = () => {
        navigate('/createCategory');
    };
    const { state } = useContext(Store);
    const { userInfo } = state;
    const [{ loading, error, categories,  successDelete }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' });
                const { data } = await axios.get(`/api/categories`, {
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
    const deleteHandler = async (category) => {
        if (window.confirm('Are you sure to delete?')) {
            try {
                dispatch({ type: 'DELETE_REQUEST' });
                await axios.delete(`/api/categories/${category._id}`,{
                    headers: { Authorization: `Bearer ${userInfo.token}` },});
                toast.success('category deleted successfully');
                dispatch({ type: 'DELETE_SUCCESS' });
            } catch (error) {
                toast.error(getError(error));
                dispatch({
                    type: 'DELETE_FAIL',
                });
            }
        }
    };

    return (
        <div className="container ">
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
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
            )}
        </div>
    );
}
