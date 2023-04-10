import { Link } from 'react-router-dom';
import './newpost.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
function Post(props) {
    const { post } = props;
    return (
        <MDBCard className="mb-3 p-3 shadow-lg" style={{ borderRadius: '15px', border: '1px solid black' }}>
            {post.fileUpload === null ? (
                <MDBCardImage
                    // position="top"
                    style={{ width: '900px', height: '400px', borderRadius: '15px', objectFit: 'cover' }}
                    src="https://mdbootstrap.com/img/new/slides/041.webp"
                    alt="..."
                />
            ) : (
                <MDBCardImage
                    position="top"
                    style={{ width: '900px', height: '300px', borderRadius: '15px', objectFit: 'cover' }}
                    src={post.fileUpload}
                    alt="..."
                />
            )}
            <MDBCardBody className="">
                <Link to={`/posts/${post._id}`}>
                    <MDBCardTitle>{post.title}</MDBCardTitle>
                </Link>
                <MDBCardText>{post.content}</MDBCardText>
                <div className="d-flex  justify-content-between">
                    <MDBCardText>
                        <small className="text-muted">Post by: {post.postBy}</small>
                        <br />
                        <small className="text-muted">
                            <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
                        </small>
                    </MDBCardText>
                    {/* =================== Like & DisLike =================== */}
                    <div className="d-flex gap-3">
                        <div className="d-flex gap-2 align-items-center">
                            <i className="ri-thumb-up-fill fs-4"></i>
                            <p className="mt-2">{post.likes}</p>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <i className="ri-thumb-down-fill fs-4"></i>
                            <p className="mt-2">{post.dislikes}</p>
                        </div>
                    </div>
                    {/* =================== View =================== */}
                    <div className="d-flex gap-2 align-items-center">
                        <i className="fa fa-eye fs-4"></i>
                        <p className="mt-2 pt-2">{post.views}</p>
                        <i className="ri-message-3-fill fs-2"></i>
                        <p className="mt-2 pt-2">{post.comments.length}</p>
                    </div>
                </div>
            </MDBCardBody>
        </MDBCard>
    );
}
export default Post;