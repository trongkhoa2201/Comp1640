import React, { useState, useEffect } from "react";
import axios from "axios";

const PostDetail = ({ match }) => {
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const getPost = async () => {
        const response = await axios.get(`/api/posts/${match.params.id}`);
        setPost(response.data);
        setComments(response.data.comments);
        setLikes(response.data.likes);
        };
        getPost();
    }, [match.params.id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(`/api/posts/${post._id}/comments`, {
            content: newComment,
            author: "Guest",
        });
        setComments([...comments, response.data]);
        setNewComment("");
        } catch (error) {
        console.log(error);
        }
    };

    const handleLikeClick = async () => {
        try {
        const response = await axios.post(`/api/posts/${post._id}/likes`);
        setLikes(response.data.likes);
        } catch (error) {
        console.log(error);
        }
    };

    return (
        <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        Likes: {likes} <button onClick={handleLikeClick}>Like</button>
        <h3>Comments</h3>
        <form onSubmit={handleCommentSubmit}>
            <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
        <ul>
            {comments.map((comment, index) => (
            <li key={index}>
                <h4>{comment.author}</h4>
                <p>{comment.content}</p>
            </li>
            ))}
        </ul>
        </div>
    );
    };

export default PostDetail;