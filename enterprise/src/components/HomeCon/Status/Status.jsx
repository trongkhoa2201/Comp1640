import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import '../Status/Status.css';
import axios from 'axios';
import Post from '../../Post/NewPost';
import Pagination from '../../Pagination';

export const Status = () => {
    const [posts, setPosts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [postPerPages, setPostPerPages] = useState(5);

    const [filter, setFilter] = useState('all');
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/posts');
            setPosts(result.data);
        };
        fetchData();
    }, []);

    const lastPostIndex = currentPages * postPerPages;
    const firstPostIndex = lastPostIndex - postPerPages;
    // const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    let currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    if (filter === 'highView') {
        currentPosts = posts.sort((a, b) => b.views - a.views);
    }
    if (filter === 'lowView') {
        currentPosts = posts.sort((a, b) => a.views - b.views);
    }
    if (filter === 'highLike') {
        currentPosts = posts.sort((a, b) => b.likes - a.likes);
    }
    if (filter === 'latest') {
        currentPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
    }
<<<<<<< HEAD
    if (filter === 'latest') {
        currentPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
    }
=======
>>>>>>> 6e665b5dcc06d298ba2f92f5b8809bc76b3b2099
    const handleFilterClick = (filterType) => {
        setFilter(filterType);
    };

    return (
        <div>
            <div
<<<<<<< HEAD
                className="filter my-3 p-2"
                style={{ borderTop: '3px solid black', borderBottom: '3px solid black', background: 'white' }}
=======
                className="filter mb-2"
>>>>>>> 6e665b5dcc06d298ba2f92f5b8809bc76b3b2099
                className="filter my-3 p-2"
                style={{ borderTop: '3px solid black', borderBottom: '3px solid black', background: 'white' }}
            >
                <DropdownButton id="dropdown-basic-button" title={`Filter: ${filter}`}>
                    <Dropdown.Item onClick={() => handleFilterClick('all')}> All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('highView')}> High View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('lowView')}>Low View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('highLike')}>High Like</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('latest')}>Latest</Dropdown.Item>
                </DropdownButton>
            </div>
            {currentPosts.map((post) => (
                <div className="products">
                    <Row key={post._id}>
                        <Post post={post}></Post>
                    </Row>
                </div>
            ))}
            {/* =============================================  */}
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
