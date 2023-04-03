import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../TopTrend/Trend.css';
import Ava from '../../img/Ava.jpg';
import axios from 'axios';

const Trend = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('/api/topics')
            .then((response) => {
                setPosts(response.data);
                console.log(posts);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Container className="trend-container mb-4">
            <div className="trend-box" style={{ position: 'relative' }}>
                <img className=" w-100 h-100" src={Ava} alt="" style={{ borderRadius: '12px' }} />
                <div className="layer">
                    <div className="mb-3 mt-5">
                        <h2 style={{ color: 'white', fontSize: '20px' }}>Topic title</h2>
                    </div>
                    <div style={{ color: 'white', overflow: 'hidden', height: '100px' }}>
                        <p>postBy</p>
                    </div>
                </div>
            </div>
            <div className="trend-box"></div>
            <div className="trend-box"></div>
            <div className="trend-box"></div>
        </Container>
    );
};

export default Trend;
