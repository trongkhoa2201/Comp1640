import axios from 'axios';
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import "../Dashboard/Dashboard.css"
import Chart from 'react-google-charts';
import { getError } from '../../getError';
import { Store } from '../../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import LoadingBox from '../../components/LoadingBox/LoadingBox';
import MessageBox from '../../components/MessageBox/MessageBox';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                summary: action.payload,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
export default function Dashboard(){
    const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    });
    const { state } = useContext(Store);
    const { userInfo } = state;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/users/summary', {
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
        fetchData();
    }, [userInfo]);
return (
    <div>
        <h1 style={{textAlign: 'center', marginTop: '20px'}}>Dashboard</h1>
        {loading ? (
            <LoadingBox />
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <>
                <Row>
                    <Col md={4} className='dashboard-box'>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {summary.users && summary.users[0] ? summary.users[0].numUsers : 0}
                                </Card.Title>
                                <Card.Text style={{marginLeft: '10px', fontWeight: 'bold'}}> Users</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className='dashboard-box'>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {summary.topics && summary.topics[0] ? summary.topics[0].numTopics : 0}
                                </Card.Title>
                                <Card.Text style={{marginLeft: '10px', fontWeight: 'bold'}}> Topics</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className='dashboard-box'>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    {summary.posts && summary.posts[0] ? summary.posts[0].numPosts : 0}
                                </Card.Title>
                                <Card.Text style={{marginLeft: '10px', fontWeight: 'bold'}}> Posts</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <div className="my-3">
                    <h4 style={{marginLeft: '20px'}}>Posts</h4>
                    {summary.dailyPost.length === 0 ? (
                        <MessageBox>No Post</MessageBox>
                    ) : (
                        <Chart
                            width="90%"
                            height="400px"
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[['Date', 'Posts'], ...summary.dailyPost.map((x) => [x._id, x.posts])]}
                            className='dashboard-chart'
                        ></Chart>
                    )}
                </div>
                <div className="my-3">
                    <h4 style={{marginLeft: '20px'}}>User in Department</h4>
                    {summary.departmentCounts.length === 0 ? (
                        <MessageBox>No User</MessageBox>
                    ) : (
                        <Chart
                            width="90%"
                            height="400px"
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ['Department', 'Users'],
                                ...summary.departmentCounts.map((x) => [x._id, x.count]),
                            ]}
                            className='dashboard-chart'
                        ></Chart>
                    )}
                </div>
                <div className="my-3">
                    <h4 style={{marginLeft: '20px'}}>Post in Topic</h4>
                    {summary.postInTopic.length === 0 ? (
                        <MessageBox>No Post</MessageBox>
                    ) : (
                        <Chart
                            width="90%"
                            height="400px"
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ['Topic', 'Posts'],
                                ...summary.postInTopic.map((x) => [x._id, x.count]),
                            ]}
                            className='dashboard-chart'
                        ></Chart>
                    )}
                </div>
                <div className="my-3">
                    <h4 style={{marginLeft: '20px'}}>Post is Annonymous</h4>
                    {summary.postIsAnonymous.length === 0 ? (
                        <MessageBox>No Post</MessageBox>
                    ) : (
                        <Chart
                            width="90%"
                            height="400px"
                            chartType="PieChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ['isAnnonymous', 'Posts'],
                                ...summary.postIsAnonymous.map((x) => [x._id.toString(), x.count]),
                            ]}
                            className='dashboard-chart'
                        ></Chart>
                    )}
                </div>
            </>
        )}
    </div>
);
};