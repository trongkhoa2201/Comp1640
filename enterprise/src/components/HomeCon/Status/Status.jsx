import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Row } from 'react-bootstrap';
import '../Status/Status.css';
import axios from 'axios';
import Post from '../../Post/NewPost';
import Pagination from '../../Pagination';

export const Status = () => {
    const [posts, setPosts] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [postPerPages, setPostPerPages] = useState(5);

    const [filter, setFilter] = useState('All');
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

    if (filter === 'Most Views') {
        currentPosts = posts.sort((a, b) => b.views - a.views);
    }
    if (filter === 'Low Views') {
        currentPosts = posts.sort((a, b) => a.views - b.views);
    }
    if (filter === 'Most Likes') {
        currentPosts = posts.sort((a, b) => b.likes - a.likes);
    }
    const handleFilterClick = (filterType) => {
        setFilter(filterType);
    };

    return (
        <div>
            <div
                className="filter mb-2"
            >
                <DropdownButton className='drop-down' id="dropdown-basic-button" title={`${filter}`}>
                    <Dropdown.Item onClick={() => handleFilterClick('all')}> All</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('Most Views')}> Most View Posts</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('Low Views')}>Low View Posts</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('Most Likes')}>Most Like Posts</Dropdown.Item>

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