import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../TopTrend/Trend.css';
import Ava from "../../img/Ava.jpg"
import { Link } from 'react-router-dom';

const Trend = () => {

   const [posts, setPosts] = useState([]);

   useEffect(() => {
       const fetchData = async () => {
           const result = await axios.get('/api/posts');
           setPosts(result.data);
       };
       fetchData();
   }, []);

   // down
   const trendingPosts = posts.sort((a, b) => b.views - a.views).slice(0, 4);

    return (
      

        // </Container>
        <Container className="trend-container mb-4 gap-2">
            {trendingPosts.map((post) => (
                <div className="trend-box" key={post._id} style={{ position: 'relative' }}>
                    <img className="w-100 h-100" src={post.fileUpload} alt="" style={{ borderRadius: '12px' }} />
                    <div className="layer">
                        <div className="mb-3 mt-5">
                            <Link to={`/posts/${post._id}`}>
                                <h2 style={{ color: 'white', fontSize: '20px' }}>{post.title}</h2>
                            </Link>
                        </div>
                        <div style={{ color: 'white', overflow: 'hidden', height: '100px' }}>
                            <p>{post.topic.title}</p>
                        </div>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default Trend;