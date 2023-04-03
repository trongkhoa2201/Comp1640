import { Link } from 'react-router-dom';
import './newpost.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import Moment from 'react-moment';
function Post(props) {
    const { post } = props;

    return (
        // <Card>
        //     <Link to={`/posts/${post._id}`}>
        //         <img src={post.fileUpload} className="card-img-top" alt={post.title} />
        //     </Link>
        //     <Card.Body>
        //         <Link to={`/posts/${post._id}`}>
        //             <Card.Title>{post.title}</Card.Title>
        //         </Link>
        //         <Card.Text>
        //             <strong>{post.postBy}</strong>
        //         </Card.Text>
        //     </Card.Body>
        // </Card>
        <MDBCard className="mb-3">
            <MDBCardImage position="top" src="https://mdbootstrap.com/img/new/slides/041.webp" alt="..." />
            <MDBCardBody>
                <Link to={`/posts/${post._id}`}>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                </Link>
                <MDBCardText>{post.content}</MDBCardText>
                <MDBCardText>
                    <small className="text-muted">Post by: {post.postBy}</small>
                    <br />
                    <small className="text-muted">
                        <Moment format="YYYY/MM/DD">{post.createAt}</Moment>
                    </small>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>
    );
}
export default Post;
