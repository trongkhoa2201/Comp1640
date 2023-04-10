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
            >
                <DropdownButton className='drop-down' id="dropdown-basic-button" title={`${filter}`}>
                    <Dropdown.Item onClick={() => handleFilterClick('all')}> All</Dropdown.Item>
<<<<<<< HEAD
                    <Dropdown.Item onClick={() => handleFilterClick('Most Views')}> Most View Posts</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('Low Views')}>Low View Posts</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('Most Likes')}>Most Like Posts</Dropdown.Item>
=======
                    <Dropdown.Item onClick={() => handleFilterClick('highView')}> High View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('lowView')}>Low View</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilterClick('highLike')}>High Like</Dropdown.Item>
<<<<<<< HEAD
                    <Dropdown.Item onClick={() => handleFilterClick('latest')}>Latest</Dropdown.Item>
=======
>>>>>>> 6e665b5dcc06d298ba2f92f5b8809bc76b3b2099
>>>>>>> a36a193b3f75547090965e1d383f06ef16b7a757
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
