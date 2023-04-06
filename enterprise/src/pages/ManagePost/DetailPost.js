import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Moment from 'react-moment';

function DetailPost() {
    const params = useParams();
    const navigate = useNavigate();
    const { id: postId } = params;
    const [post, setPost] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`/api/posts/${postId}`);
                setPost(result.data);
                console.log(post);
            } catch (err) {}
        };
        fetchData();
    }, [postId]);

    return (
        <div>
            <Row>
                <Col md={6}>
                    {post.fileUpload === null ? (
                        <img
                            className="img-large"
                            src="https://mdbootstrap.com/img/new/slides/041.webp"
                            alt={post.title}
                            width="650"
                            height="600"
                        ></img>
                    ) : (
                        <img
                            className="img-large"
                            src={post.fileUpload}
                            alt={post.title}
                            width="650"
                            height="600"
                        ></img>
                    )}
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h1>{post.title}</h1>
                        </ListGroup.Item>

                        <ListGroup.Item>Author : {post.postBy}</ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description: </strong>
                            {post.content}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Category: </strong>
                            {post.category}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Topic: </strong>
                            {post.topic}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Create At:
                            <Moment format="YYYY/MM/DD">{post.createAt}</Moment>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}
export default DetailPost;
