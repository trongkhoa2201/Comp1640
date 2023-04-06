import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import '../Status/Status.css';
import axios from 'axios';
import Post from '../../Post/NewPost';
import Pagination from '../../Pagination';

export const Status = () => {
    const [posts, setPosts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [postPerPages, setPostPerPages] = useState(5);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/posts');
            setPosts(result.data);
        };
        fetchData();
    }, []);
    const lastPostIndex = currentPages * postPerPages;
    const firstPostIndex = lastPostIndex - postPerPages;
    const currenPosts = posts.slice(firstPostIndex, lastPostIndex);
    return (
        <div className="status shadow-lg p-3 bg-body mb-4">
            <div className="d-flex align-items-center justify-content-between ">
                <div className="products">
                    {currenPosts.map((post) => (
                        <Row key={post._id}>
                            <Post post={post}></Post>
                        </Row>
                    ))}
                </div>
            </div>
            <div>
                <Pagination
                    totalPosts={posts.length}
                    postsPerPages={postPerPages}
                    setCurrentPages={setCurrentPages}
                    currentPages={currentPages}
                />
            </div>
        </div>
    );
};
