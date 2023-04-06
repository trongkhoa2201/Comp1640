import { Link } from 'react-router-dom';
import './newpost.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
function Post(props) {
    const { post } = props;
    return (
        <MDBCard className="mb-3">
            {post.fileUpload === null ? (
                <MDBCardImage position="top" src="https://mdbootstrap.com/img/new/slides/041.webp" alt="..." />
            ) : (
                <MDBCardImage position="top" src={post.fileUpload} alt="..." />
            )}
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
                <div className="d-flex gap-2 align-items-center">
                    <i className="fa fa-eye"></i>
                    <p className="mt-2">{post.views}</p>
                </div>
                <div className="d-flex gap-2 align-items-center">
                    <i className="fa fa-heart"></i>
                    <p className="mt-2">{post.likes.quantity}</p>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}
export default Post;
