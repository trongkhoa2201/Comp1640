import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Tag/Tag.css';

const Tag = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        axios
            .get('/api/topics')
            .then((response) => {
                setTopics(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="tag-category shadow-lg p-3 bg-body rounded">
            <h4>Topic</h4>
            {topics.map((topic) => (
                <ul key={topic.id}>
                    <li>{topic.title}</li>
                </ul>
            ))}
        </div>
    );
};

export default Tag;
